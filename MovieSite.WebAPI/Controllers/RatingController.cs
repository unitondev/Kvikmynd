using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;
        private readonly IMovieService _movieService;
        private readonly IMapper _mapper;

        public RatingController(IRatingService ratingService, IMovieService movieService, IMapper mapper)
        {
            _ratingService = ratingService;
            _movieService = movieService;
            _mapper = mapper;
        }

        [HttpPost("get")]
        public async Task<IActionResult> GetRating([FromBody] RatingModel model)
        {
            var result = await _ratingService.GetByUserAndMovieIdAsync(model.UserId, model.MovieId);

            var viewModel = _mapper.Map<MovieRating, MovieRatingViewModel>(result);
            
            return Ok(viewModel);
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovieRatingViewModel model)
        {
            var entity = _mapper.Map<MovieRatingViewModel, MovieRating>(model);
            
            var result = await _ratingService.CreateAsync(entity);
            if (!result.IsSucceeded) return BadRequest();
            
            await _movieService.RecalculateMovieRatingAsync(model.MovieId);
            return Ok(result.Result);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] RatingModel model)
        {
            var rating = await _ratingService.GetByUserAndMovieIdAsync(model.UserId, model.MovieId);
            if (rating == null) return NotFound();

            var result = await _ratingService.DeleteAsync(rating);
            if (!result.IsSucceeded) return BadRequest();
            
            await _movieService.RecalculateMovieRatingAsync(model.MovieId);
            return Ok();
        }
    }
}
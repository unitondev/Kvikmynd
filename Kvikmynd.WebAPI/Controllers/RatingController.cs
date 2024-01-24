using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kvikmynd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : BaseSimpleApiController
    {
        private readonly IRatingService _ratingService;
        private readonly IMapper _mapper;

        public RatingController(IRatingService ratingService, IMapper mapper)
        {
            _ratingService = ratingService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetRating([FromQuery] RatingModel model)
        {
            var result = await _ratingService.GetByUserAndMovieIdAsync(model.UserId, model.MovieId);
            if (!result.IsSucceeded)
            {
                if (result.Error != ErrorCode.UserRatingNotFound) return CustomBadRequest(result.Error);
                return NoContent();
            }
            
            var viewModel = _mapper.Map<MovieRating, MovieRatingViewModel>(result.Result);
            
            return Ok(viewModel);
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovieRatingViewModel model)
        {
            var movieRating = await _ratingService.FindAsync(r => r.MovieId == model.MovieId && r.UserId == model.UserId);
            if (movieRating != null)
            {
                var deleteResult = await _ratingService.DeleteAsync(movieRating);
                if (!deleteResult.IsSucceeded) return CustomBadRequest(deleteResult.Error);
            }
            
            var entity = _mapper.Map<MovieRatingViewModel, MovieRating>(model);
            
            var result = await _ratingService.CreateAsync(entity);
            if (!result.IsSucceeded) return CustomBadRequest(result.Error);
            
            return Ok(result.Result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] RatingModel model)
        {
            var getRatingResult = await _ratingService.GetByUserAndMovieIdAsync(model.UserId, model.MovieId);
            if (!getRatingResult.IsSucceeded)
            {
                if (getRatingResult.Error == ErrorCode.UserRatingNotFound) return CustomNotFound(getRatingResult.Error);
                return CustomBadRequest(getRatingResult.Error);
            }

            var result = await _ratingService.DeleteAsync(getRatingResult.Result);
            if (!result.IsSucceeded) return CustomBadRequest(result.Error);
            return NoContent();
        }
    }
}
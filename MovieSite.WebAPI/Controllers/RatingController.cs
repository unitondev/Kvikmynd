using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Helper;

namespace MovieSite.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;
        private readonly IMovieService _movieService;

        public RatingController(IRatingService ratingService, IMovieService movieService)
        {
            _ratingService = ratingService;
            _movieService = movieService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateRatingRequest ratingRequest)
        {
            var response = await _ratingService.CreateRatingAsync(ratingRequest);
            await _movieService.RecalculateMovieRatingAsync(ratingRequest.MovieId);

            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpPost("getRating")]
        public async Task<IActionResult> GetRating([FromBody] RatingRequest ratingRequest)
        {
            var response = await _ratingService.GetRatingByUserAndMovieIdAsync(ratingRequest);
            return ResponseHandler.HandleResponseCode(response);
        }
        
        [HttpPost("deleteRating")]
        public async Task<IActionResult> Delete([FromBody] RatingRequest ratingRequest)
        {
            await _ratingService.DeleteRatingByUserAndMovieIdAsync(ratingRequest);
            await _movieService.RecalculateMovieRatingAsync(ratingRequest.MovieId);

            return Ok();
        }

    }
}
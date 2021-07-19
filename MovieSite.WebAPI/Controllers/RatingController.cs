using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Helper;

namespace MovieSite.Controllers
{
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;
        private readonly IMovieService _movieService;

        public RatingController(IRatingService ratingService, IMovieService movieService)
        {
            _ratingService = ratingService;
            _movieService = movieService;
        }

        [HttpPost("create_rating")]
        public async Task<IActionResult> CreateRatings([FromBody] CreateRatingRequest ratingRequest)
        {
            await _ratingService.CreateRatingAsync(ratingRequest);
            await _movieService.RecalculateMovieRatingAsync(ratingRequest.MovieId);
            return Ok();
        }

        [HttpPost("get_rating")]
        public async Task<IActionResult> GetRating([FromBody] RatingRequest ratingRequest)
        {
            var response = await _ratingService.GetRatingByUserAndMovieIdAsync(ratingRequest);
            return ResponseHandler.HandleResponseCode(response);
        }
        
        [HttpPost("delete_rating")]
        public async Task<IActionResult> DeleteRating([FromBody] RatingRequest ratingRequest)
        {
            await _ratingService.DeleteRatingByUserAndMovieIdAsync(ratingRequest);
            await _movieService.RecalculateMovieRatingAsync(ratingRequest.MovieId);
            return Ok();
        }

    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Helper;

namespace MovieSite.Controllers
{
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("movies")]
        public async Task<IActionResult> GetAllMovies()
        {
            var result = await _movieService.GetAllMoviesAsync();
            if (result == null)
                return NotFound(Error.MovieNotFound);
            return Ok(result);
        }

        [HttpGet("movie{id})")]
        public async Task<IActionResult> GetMovieById(int movieId)
        {
            var result = await _movieService.GetMovieByIdAsync(movieId);
            if (result == null)
                return NotFound(Error.MovieNotFound);
            return Ok(result);
        }

        [HttpPost("add_movie")]
        public async Task<IActionResult> CreateMovie([FromBody] MovieRequest movieRequest)
        {
            if (movieRequest == null)
                return NotFound(Error.MovieNotFound);
            
            var response = await _movieService.CreateMovieAsync(movieRequest);
            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpPost("update_movie")]
        public async Task<IActionResult> UpdateMovie([FromBody] MovieRequest movieRequest)
        {
            if (movieRequest == null)
                return NotFound(Error.MovieNotFound);
            
            var response = await _movieService.UpdateMovieAsync(movieRequest);
            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpGet("delete_movie{id}")]
        public async Task<IActionResult> DeleteMovieById(int id)
        {
            await _movieService.DeleteMovieByIdAsync(id);
            return Ok();
        }
    }
}
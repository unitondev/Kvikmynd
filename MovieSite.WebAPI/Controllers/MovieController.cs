using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;

namespace MovieSite.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly IMapper _mapper;

        public MovieController(IMovieService movieService, IMapper mapper)
        {
            _movieService = movieService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _movieService.GetAllMoviesAsync();
            if (result == null) return NotFound(ErrorCode.MovieNotFound);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _movieService.GetByKeyAsync(id);
            if (result == null) return NotFound(ErrorCode.MovieNotFound);

            return Ok(result);
        }
        
        [HttpGet("{id}/withGenres")]
        public async Task<IActionResult> GetMovieWithGenresById(int id)
        {
            var isMovieExists = await _movieService.ExistsAsync(id);
            if (!isMovieExists)
            {
                return NotFound(ErrorCode.MovieNotFound);
            }
            
            var movieWithGenres = await _movieService.GetMovieWithGenresByIdAsync(id);

            return Ok(movieWithGenres);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovieRequest model)
        {
            var result = await _movieService.CreateMovieAsync(model);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditMovieRequest model)
        {
            var result = await _movieService.UpdateMovieAsync(model);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }

        [HttpGet("{id}/comments")]
        public async Task<IActionResult> GetMovieComments(int id)
        {
            var result = await _movieService.GetMovieComments(id);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }
        
        [HttpGet("{id}/ratings")]
        public async Task<IActionResult> GetMovieRatings(int id)
        {
            var result = await _movieService.GetMovieRatings(id);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieById(int id)
        {
            var movie = await _movieService.GetByKeyAsync(id);
            if (movie == null)
            {
                return NotFound(ErrorCode.MovieNotFound);
            }
            
            var result = await _movieService.DeleteAsync(movie);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }
            
            return Ok();
        }
    }
}
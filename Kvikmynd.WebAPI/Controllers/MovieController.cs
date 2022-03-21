using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Services;
using Kvikmynd.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kvikmynd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : BaseApiController
    {
        private readonly IMovieService _movieService;
        private readonly IMapper _mapper;
        private readonly SeedService _seedService;

        public MovieController(IMovieService movieService, IMapper mapper, SeedService seedService)
        {
            _movieService = movieService;
            _mapper = mapper;
            _seedService = seedService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SearchQueryModel model)
        {
            var result = await _movieService.GetAllMoviesAsync(model);
            if (result == null) return CustomNotFound(ErrorCode.MovieNotFound);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _movieService.GetByKeyAsync(id);
            if (result == null) return CustomNotFound(ErrorCode.MovieNotFound);

            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpGet("{id}/withGenres")]
        public async Task<IActionResult> GetMovieWithGenresById(int id)
        {
            var isMovieExists = await _movieService.ExistsAsync(id);
            if (!isMovieExists)
            {
                return CustomNotFound(ErrorCode.MovieNotFound);
            }
            
            var movieWithGenres = await _movieService.GetMovieWithGenresByIdAsync(id);

            return Ok(movieWithGenres);
        }

        [Authorize(Policy = PolicyTypes.AddMovie)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovieModel model)
        {
            var result = await _movieService.CreateMovieAsync(model);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }

        [Authorize(Policy = PolicyTypes.EditMovie)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] MovieModel model)
        {
            var result = await _movieService.UpdateMovieAsync(model);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }

        [AllowAnonymous]
        [HttpGet("{id}/comments")]
        public async Task<IActionResult> GetMovieComments(int id)
        {
            var result = await _movieService.GetMovieComments(id);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }
        
        [AllowAnonymous]
        [HttpGet("{id}/ratings")]
        public async Task<IActionResult> GetMovieRatings(int id)
        {
            var result = await _movieService.GetMovieRatings(id);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }
        
        [Authorize(Policy = PolicyTypes.EditMovie)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieById(int id)
        {
            var movie = await _movieService.GetByKeyAsync(id);
            if (movie == null)
            {
                return CustomNotFound(ErrorCode.MovieNotFound);
            }
            
            var result = await _movieService.DeleteAsync(movie);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok();
        }

        // call this endpoint when initializing the db
        [AllowAnonymous]
        [HttpGet("seed")]
        public async Task<IActionResult> PopulateMoviesCovers()
        {
            await _seedService.SeedMoviesCoversAsync();
            await _seedService.SeedAdmin();
            return Ok();
        }
    }
}
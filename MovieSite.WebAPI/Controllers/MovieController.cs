using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Helper;
using MovieSite.ViewModels;

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
            if (result == null) return NotFound(Error.MovieNotFound);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _movieService.GetMovieByIdAsync(id);
            if (result == null) return NotFound(Error.MovieNotFound);

            return Ok(result);
        }
        
        [HttpGet("{id}/withGenres")]
        public async Task<IActionResult> GetMovieWithGenresById(int id)
        {
            var movieWithGenres = await _movieService.GetMovieWithGenresByIdAsync(id);
            if (movieWithGenres == null) return NotFound(Error.MovieNotFound);
            
            var movieWithGenresViewModel = _mapper.Map<MovieWithGenresResponse, MovieWithGenresViewModel>(movieWithGenres);
            return Ok(movieWithGenresViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovieRequest movieRequest)
        {
            if (movieRequest == null) return NotFound(Error.MovieNotFound);
            
            var response = await _movieService.CreateMovieAsync(movieRequest);
            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditMovieRequest editMovieRequest)
        {
            if (editMovieRequest == null) return NotFound(Error.MovieNotFound);
            
            var response = await _movieService.UpdateMovieAsync(editMovieRequest);
            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpGet("{id}/comments")]
        public async Task<IActionResult> GetMovieComments(int id)
        {
            var response = await _movieService.GetMovieComments(id);
            return ResponseHandler.HandleResponseCode(response);
        }
        
        [HttpGet("{id}/ratings")]
        public async Task<IActionResult> GetMovieRatings(int id)
        {
            var response = await _movieService.GetMovieRatings(id);
            return ResponseHandler.HandleResponseCode(response);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieById(int id)
        {
            await _movieService.DeleteMovieByIdAsync(id);
            return Ok();
        }
    }
}
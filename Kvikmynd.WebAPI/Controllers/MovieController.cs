using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Services;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Authorization;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        private readonly IFileUploadService _fileUploadService;

        public MovieController(IMovieService movieService, IMapper mapper, SeedService seedService, IFileUploadService fileUploadService)
        {
            _movieService = movieService;
            _mapper = mapper;
            _seedService = seedService;
            _fileUploadService = fileUploadService;
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
            var movieToCreate = await _movieService.FindAsync(m => m.Title == model.Title);
            if (movieToCreate != null)
            {
                return CustomBadRequest(ErrorCode.MovieAlreadyExists);
            }
            
            var genres = _mapper.Map<List<GenreModel>, List<Genre>>(model.Genres);
            movieToCreate = _mapper.Map<MovieModel, Movie>(model);
            
            if (model.Cover?.Length > 0)
            {
                movieToCreate.CoverUrl = await _fileUploadService.UploadImageToFirebaseAsync(model.Cover, "covers");
            }
            else
            {
                var defaultCoverBytes = await System.IO.File.ReadAllBytesAsync(@"../Kvikmynd.Infrastructure/Covers/defaultMovieCover.png");
                movieToCreate.CoverUrl = await _fileUploadService.UploadImageToFirebaseAsync(Convert.ToBase64String(defaultCoverBytes), "covers");
            }
            
            foreach (var genre in genres)
            {
                movieToCreate.GenreMovies.Add(new GenreMovie
                {
                    Movie = movieToCreate,
                    Genre = genre,
                });
            }

            var result = await _movieService.CreateAsync(movieToCreate);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok(result.Result);
        }

        [Authorize(Policy = PolicyTypes.EditMovie)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditMovieModel model)
        {
            var isMovieExists = await _movieService.ExistsAsync(model.Id);
            if (!isMovieExists) return CustomNotFound(ErrorCode.MovieNotFound);

            var movieToUpdate = await _movieService
                .GetAll()
                .Where(m => m.Id == model.Id)
                .Include(m => m.GenreMovies)
                .AsTracking()
                .FirstOrDefaultAsync();

            var genresToUpdate = _mapper.Map<List<GenreModel>, List<Genre>>(model.Genres);
            _mapper.Map<EditMovieModel, Movie>(model, movieToUpdate);
            
            if (model.Cover?.Length > 0)
            {
                await _fileUploadService.DeleteImageFromFirebaseAsync(movieToUpdate.CoverUrl, "covers");
                movieToUpdate.CoverUrl = await _fileUploadService.UploadImageToFirebaseAsync(model.Cover, "covers");
            }
            else if (model.CoverUrl?.Length == 0)
            {
                var defaultCoverBytes = await System.IO.File.ReadAllBytesAsync(@"../Kvikmynd.Infrastructure/Covers/defaultMovieCover.png");
                movieToUpdate.CoverUrl = await _fileUploadService.UploadImageToFirebaseAsync(Convert.ToBase64String(defaultCoverBytes), "covers");
            }
            
            foreach (var genre in genresToUpdate)
            {
                movieToUpdate.GenreMovies.Add(new GenreMovie
                {
                    Movie = movieToUpdate,
                    Genre = genre,
                });
            }
            
            var result = await _movieService.UpdateAsync(movieToUpdate);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok(result);
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
            if (!await _movieService.ExistsAsync(id))
            {
                return CustomNotFound(ErrorCode.MovieNotFound);
            }

            var movieRatings = await _movieService
                .GetAll()
                .Where(m => m.Id == id)
                .Select(m => m.MovieRatings)
                .FirstOrDefaultAsync();

            return Ok(movieRatings);
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
            
            await _fileUploadService.DeleteImageFromFirebaseAsync(movie.CoverUrl, "covers");
            
            var result = await _movieService.DeleteAsync(movie);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return Ok();
        }

        [HttpPost("getMyMoviesRatings")]
        public async Task<IActionResult> GetMoviesRatings([FromBody] GetMoviesRatingsModel model)
        {
            var result = await _movieService.GetMoviesWithRatingByUserIdAsync(model);

            var viewModels = _mapper.Map<List<MovieWithRatingsModel>, List<MovieWithRatingsViewModel>>(result.Items);
            
            return Ok(new TotalCountViewModel<MovieWithRatingsViewModel>()
            {
                Items = viewModels,
                TotalCount = result.TotalCount
            });
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
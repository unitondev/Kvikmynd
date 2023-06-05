using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Models.Request;
using Kvikmynd.Application.Services;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;
using Kvikmynd.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
        private readonly IService<BookmarkMovie> _bookmarkMovieService;

        public MovieController(
            IAccountService accountService,
            IMovieService movieService,
            IMapper mapper,
            SeedService seedService,
            IFileUploadService fileUploadService,
            IService<BookmarkMovie> bookmarkMovieService
            ) : base(accountService)
        {
            _movieService = movieService;
            _mapper = mapper;
            _seedService = seedService;
            _fileUploadService = fileUploadService;
            _bookmarkMovieService = bookmarkMovieService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SearchQueryModel model, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            if (userId > 0) model.UserId = userId;
            var result = await _movieService.GetAllMoviesAsync(model, cancellationToken);
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

        [HttpGet("archived")]
        public async Task<IActionResult> GetAllArchived([FromQuery] SearchQueryModel model, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            if (userId > 0) model.UserId = userId;
            model.AreDeletedMovies = true;
            var result = await _movieService.GetAllMoviesAsync(model, cancellationToken);
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

        [HasPermission(ApplicationPermission.AddMovie)]
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

        [HasPermission(ApplicationPermission.EditMovie)]
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

        [HttpGet("{id}/similar")]
        public async Task<IActionResult> GetSimilarMovies([FromQuery] GetSimilarMoviesRequestModel model)
        {
            if (!await _movieService.ExistsAsync(model.MovieId))
            {
                return CustomNotFound(ErrorCode.MovieNotFound);
            }
            
            var userId = GetUserId();
            var returnModels = await _movieService.GetSimilarMoviesAsync(model, userId);
            return Ok(returnModels);
        }
        
        [HasPermission(ApplicationPermission.EditMovie)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieById(int id)
        {
            var movie = await _movieService.GetByKeyAsync(id);
            if (movie == null)
            {
                return CustomNotFound(ErrorCode.MovieNotFound);
            }

            movie.IsDeleted = true;
            
            var result = await _movieService.UpdateAsync(movie);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return NoContent();
        }

        [HasPermission(ApplicationPermission.EditMovie)]
        [HttpDelete("{id}/permanently")]
        public async Task<IActionResult> DeleteMoviePermanentlyById(int id)
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
            
            return NoContent();
        }

        [HttpGet("myRatings")]
        public async Task<IActionResult> GetMyRatings([FromQuery] GetMoviesRatingsModel model)
        {
            var result = await _movieService.GetMoviesWithRatingByUserIdAsync(model);

            var viewModels = _mapper.Map<List<MovieWithRatingsModel>, List<MovieWithRatingsViewModel>>(result.Items);
            
            return Ok(new TotalCountViewModel<MovieWithRatingsViewModel>()
            {
                Items = viewModels,
                TotalCount = result.TotalCount
            });
        }

        [HttpPost("bookmark")]
        public async Task<IActionResult> AddBookmark([FromBody] BookmarkMovieModel model)
        {
            var bookmarkMovie = new BookmarkMovie
            {
                MovieId = model.MovieId,
                UserId = model.UserId,
            };
            
            var result = await _bookmarkMovieService.CreateAsync(bookmarkMovie);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok(result.Result);
        }
        
        [HttpDelete("bookmark")]
        public async Task<IActionResult> DeleteBookmark([FromBody] BookmarkMovieModel model)
        {
            var bookmarkMovie = await _bookmarkMovieService.FindAsync(i => i.MovieId == model.MovieId && i.UserId == model.UserId);
            if (bookmarkMovie == null) return CustomNotFound(ErrorCode.BookmarkMovieNotFound);
            
            var result = await _bookmarkMovieService.DeleteAsync(bookmarkMovie);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet("bookmark")]
        public async Task<IActionResult> GetBookmarks([FromQuery] PagintaionModel model)
        {
            var currentUserId = GetUserId();
            var query = _bookmarkMovieService
                .GetAll()
                .Include(b => b.Movie)
                    .ThenInclude(m => m.GenreMovies)
                    .ThenInclude(gm => gm.Genre)
                .Include(b => b.Movie)
                    .ThenInclude(m => m.MovieRatings)
                .Where(b => b.UserId == currentUserId);

            var resultList = await query
                .OrderBy(b => b.MovieId)
                .Skip((int) (model.PageSize.HasValue && model.PageNumber.HasValue
                        ? ((model.PageNumber - 1) * model.PageSize)
                        : 0)
                )
                .Take(model.PageSize ?? int.MaxValue)
                .ToListAsync();

            var totalCount = await query.CountAsync();

            var result = new TotalCountViewModel<MovieWithGenresAndRatingsModel>
            {
                TotalCount = totalCount,
                Items = resultList.Select(b => new MovieWithGenresAndRatingsModel
                {
                    Movie = b.Movie,
                    GenreMovies = b.Movie.GenreMovies,
                    Ratings = b.Movie.MovieRatings,
                    IsBookmark = true
                }).ToList()
            };
            
            var moviesViewModels = _mapper.Map<List<MovieWithGenresAndRatingsModel>, 
                List<MovieWithGenresAndRatingsViewModel>>(result.Items);

            var final =  new TotalCountViewModel<MovieWithGenresAndRatingsViewModel>()
            {
                Items = moviesViewModels,
                TotalCount = result.TotalCount
            };

            return Ok(final);
        }

        [HasPermission(ApplicationPermission.EditMovie)]
        [HttpPut("{id}/restore")]
        public async Task<IActionResult> RestoreById(int id)
        {
            var movie = await _movieService.GetByKeyAsync(id);
            if (movie == null)
            {
                return CustomNotFound(ErrorCode.MovieNotFound);
            }

            movie.IsDeleted = false;
            
            var result = await _movieService.UpdateAsync(movie);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }
            
            return NoContent();
        }

        [HasPermission(ApplicationPermission.EditMovie)]
        [HttpGet("backup")]
        public async Task<IActionResult> GetAllForBackup()
        {
            var movies = await _movieService.GetAll().ToListAsync();
            return Ok(movies);
        }
        
        [HasPermission(ApplicationPermission.EditMovie)]
        [HttpPost("restore")]
        public async Task<IActionResult> Restore([FromBody] AllMoviesJsonModel model)
        {
            var movies = JsonConvert.DeserializeObject<List<Movie>>(model.Json);
            movies.ForEach(m => m.Id = 0);
            
            var result = await _movieService.CreateRangeAsync(movies);
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
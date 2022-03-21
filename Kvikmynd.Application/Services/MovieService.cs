using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Application.Services
{
    public class MovieService : GenericService<Movie>, IMovieService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _work;
        private readonly IMapper _mapper;

        public MovieService(IUnitOfWork work, IMapper mapper) : base(work.MovieRepository, work)
        {
            _work = work;
            _mapper = mapper;
        }
        
        public async Task<GenericTotalCountViewModel<MovieWithGenresAndRatingsViewModel>> GetAllMoviesAsync(SearchQueryModel model)
        {
            var movies = await _work.MovieRepository.GetMoviesWithGenresAndRatingsAsync(model);

            var moviesViewModels = _mapper.Map<List<MovieWithGenresAndRatingsModel>, 
                List<MovieWithGenresAndRatingsViewModel>>(movies.Items);

            return new GenericTotalCountViewModel<MovieWithGenresAndRatingsViewModel>()
            {
                Items = moviesViewModels,
                TotalCount = movies.TotalCount
            };
        }
        
        public async Task<MovieWithGenresViewModel> GetMovieWithGenresByIdAsync(int id)
        {
            var entityModel = await _work.MovieRepository.GetMovieWithGenresByIdAsync(id);
            
            return _mapper.Map<MovieWithGenresModel, MovieWithGenresViewModel>(entityModel);
        }
        
        public async Task<ServiceResult<Movie>> CreateMovieAsync(MovieModel model)
        {
            var movieToCreate = await FindAsync(m => m.Title == model.Title);
            if (movieToCreate != null)
            {
                return new ServiceResult<Movie>(ErrorCode.MovieAlreadyExists);
            }

            var genres = _mapper.Map<List<GenreModel>, List<Genre>>(model.Genres);
            
            movieToCreate = _mapper.Map<MovieModel, Movie>(model);

            foreach (var genre in genres)
            {
                movieToCreate.GenreMovies.Add(new GenreMovie
                {
                    Movie = movieToCreate,
                    Genre = genre,
                });
            }

            var result = await CreateAsync(movieToCreate);
            if (!result.IsSucceeded) return new ServiceResult<Movie>(ErrorCode.MovieNotCreated);

            return new ServiceResult<Movie>(result.Result);
        }
        
        public async Task<ServiceResult<Movie>> UpdateMovieAsync(MovieModel model)
        {
            // TODO split for update movie and split genres for movie
            var movieToUpdate = await FindAsync(m => m.Title == model.Title);
            if (movieToUpdate == null)
            {
                return new ServiceResult<Movie>(ErrorCode.MovieNotFound);
            }

            var genresToUpdate = new List<Genre>();
            
            foreach (var requestedGenre in model.Genres)
            {
                var genre = await _work.GenreRepository.FindAsync(g => g.Name == requestedGenre.Name);
                if (genre == null)
                {
                    return new ServiceResult<Movie>(ErrorCode.GenreNotFound);
                }

                genresToUpdate.Add(genre);
            }

            _mapper.Map<MovieModel, Movie>(model, movieToUpdate);
            
            foreach (var genre in genresToUpdate)
            {
                movieToUpdate.GenreMovies.Add(new GenreMovie
                {
                    Movie = movieToUpdate,
                    Genre = genre,
                });
            }
            
            var result = await UpdateAsync(movieToUpdate);
            if (!result.IsSucceeded) return new ServiceResult<Movie>(ErrorCode.MovieNotUpdated);

            return new ServiceResult<Movie>(movieToUpdate);
        }

        public async Task<ServiceResult<IEnumerable<MovieRating>>> GetMovieRatings(int id)
        {
            if (!await ExistsAsync(id))
            {
                return new ServiceResult<IEnumerable<MovieRating>>(ErrorCode.MovieNotFound);
            }

            var movieRatings = await _work.MovieRepository.All()
                .Where(m => m.Id == id)
                .Select(m => m.MovieRatings)
                .FirstOrDefaultAsync();

            return new ServiceResult<IEnumerable<MovieRating>>(movieRatings);
        }

        public async Task<ServiceResult<List<MovieCommentsViewModel>>> GetMovieComments(int id)
        {
            if (!await ExistsAsync(id))
            {
                return new ServiceResult<List<MovieCommentsViewModel>>(ErrorCode.MovieNotFound);
            }

            var movieComments = await _work.MovieRepository.GetMovieCommentsAsync(id);
            
            return new ServiceResult<List<MovieCommentsViewModel>>(movieComments);
        }

        public void Dispose()
        {
            _work.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _work.DisposeAsync();
        }
    }
}
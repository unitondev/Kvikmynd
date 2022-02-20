using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;
using MovieSite.ViewModels;

namespace MovieSite.Application.Services
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
        
        public async Task<IEnumerable<MovieViewModel>> GetAllMoviesAsync()
        {
            var movies = await _work.MovieRepository.All().ToListAsync();

            return _mapper.Map<List<Movie>, List<MovieViewModel>>(movies);
        }
        
        public async Task<MovieWithGenresViewModel> GetMovieWithGenresByIdAsync(int id)
        {
            var entityModel = await _work.MovieRepository.GetMovieWithGenresByIdAsync(id);
            
            return _mapper.Map<MovieWithGenresModel, MovieWithGenresViewModel>(entityModel);
        }
        
        public async Task<ServiceResult<Movie>> CreateMovieAsync(MovieModel model)
        {
            var createdMovie = await _work.MovieRepository.FindAsync(m => m.Title == model.Title);
            if (createdMovie != null)
            {
                return new ServiceResult<Movie>(ErrorCode.MovieAlreadyExists);
            }

            List<Genre> genres = new List<Genre>();
            
            foreach (var requestedGenre in model.Genres)
            {
                var genre = await _work.GenreRepository.FindAsync(g => g.Name == requestedGenre);
                if (genre == null)
                {
                    return new ServiceResult<Movie>(ErrorCode.GenreNotFound);
                }

                genres.Add(genre);
            }
            
            createdMovie = _mapper.Map<MovieModel, Movie>(model);

            foreach (var genre in genres)
            {
                createdMovie.GenreMovies.Add(new GenreMovie
                {
                    Movie = createdMovie,
                    Genre = genre,
                });
            }

            var result = await _work.MovieRepository.CreateAsync(createdMovie);
            await _work.CommitAsync();

            return new ServiceResult<Movie>(result);
        }
        
        public async Task<ServiceResult<Movie>> UpdateMovieAsync(EditMovieModel model)
        {
            // TODO split for update movie and split genres for movie
            var updatedMovie = await _work.MovieRepository.All(m => m.GenreMovies)
                .Where(m => m.Title == model.Title)
                .FirstOrDefaultAsync();

            if (updatedMovie == null)
            {
                return new ServiceResult<Movie>(ErrorCode.MovieNotFound);
            }

            List<Genre> genres = new List<Genre>();
            
            foreach (var requestedGenre in model.Genres)
            {
                var genre = await _work.GenreRepository.FindAsync(g => g.Name == requestedGenre);
                if (genre == null)
                {
                    return new ServiceResult<Movie>(ErrorCode.GenreNotFound);
                }

                genres.Add(genre);
            }

            _mapper.Map<EditMovieModel, Movie>(model, updatedMovie);
            
            foreach (var genre in genres)
            {
                updatedMovie.GenreMovies.Add(new GenreMovie
                {
                    Movie = updatedMovie,
                    Genre = genre,
                });
            }
            
            await _work.MovieRepository.UpdateAsync(updatedMovie);
            await _work.CommitAsync();

            return new ServiceResult<Movie>(updatedMovie);
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

        public async Task<ServiceResult<MovieRatingValueModel>> RecalculateMovieRatingAsync(int id)
        {
            var movie = await _work.MovieRepository
                .Filter(m => m.Id == id, m => m.MovieRatings)
                .FirstOrDefaultAsync();
            if (movie == null)
            {
                return new ServiceResult<MovieRatingValueModel>(ErrorCode.MovieNotFound);
            }

            if (movie.MovieRatings.Count == 0)
            {
                return new ServiceResult<MovieRatingValueModel>(ErrorCode.MovieRatingNotFound);
            }

            var ratingsSum = movie.MovieRatings.Sum(movieRating => movieRating.Value);
            movie.Rating = (double)ratingsSum / movie.MovieRatings.Count;
            
            await _work.MovieRepository.UpdateAsync(movie);
            await _work.CommitAsync();

            var result = new MovieRatingValueModel
            {
                Value = movie.Rating
            };
            
            return new ServiceResult<MovieRatingValueModel>(result);
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
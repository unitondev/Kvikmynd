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

namespace MovieSite.Application.Services
{
    public class MovieService : GenericService<Movie>, IMovieService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MovieService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork.MovieRepository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<MovieResponse>> GetAllMoviesAsync()
        {
            var movies = await _unitOfWork.MovieRepository.All().ToListAsync();

            return _mapper.Map<List<Movie>, List<MovieResponse>>(movies);
        }
        
        public async Task<MovieWithGenresResponse> GetMovieWithGenresByIdAsync(int movieId)
        {
            return await _unitOfWork.MovieRepository.GetMovieWithGenresById(movieId);
        }
        
        public async Task<ServiceResult<Movie>> CreateMovieAsync(MovieRequest movieRequest)
        {
            var createdMovie = await _unitOfWork.MovieRepository.FindByTitleAsync(movieRequest.Title);
            if (createdMovie != null)
            {
                return new ServiceResult<Movie>(ErrorCode.MovieAlreadyExists);
            }

            List<Genre> genres = new List<Genre>();
            
            foreach (var requestedGenre in movieRequest.Genres)
            {
                var genre = await _unitOfWork.GenreRepository.FindByNameAsync(requestedGenre);
                if (genre == null)
                {
                    return new ServiceResult<Movie>(ErrorCode.GenreNotFound);
                }

                genres.Add(genre);
            }
            
            createdMovie = _mapper.Map<MovieRequest, Movie>(movieRequest);

            foreach (var genre in genres)
            {
                createdMovie.GenreMovies.Add(new GenreMovie
                {
                    Movie = createdMovie,
                    Genre = genre,
                });
            }

            var result = await _unitOfWork.MovieRepository.CreateAsync(createdMovie);
            await _unitOfWork.CommitAsync();

            return new ServiceResult<Movie>(result);
        }
        
        public async Task<ServiceResult<Movie>> UpdateMovieAsync(EditMovieRequest editMovieRequest)
        {
            var updatedMovie = await _unitOfWork.MovieRepository.FindByTitleForUpdateAsync(editMovieRequest.Title);
            if (updatedMovie == null)
            {
                return new ServiceResult<Movie>(ErrorCode.MovieNotFound);
            }

            List<Genre> genres = new List<Genre>();
            
            foreach (var requestedGenre in editMovieRequest.Genres)
            {
                var genre = await _unitOfWork.GenreRepository.FindByNameAsync(requestedGenre);
                if (genre == null)
                {
                    return new ServiceResult<Movie>(ErrorCode.GenreNotFound);
                }

                genres.Add(genre);
            }

            _mapper.Map<EditMovieRequest, Movie>(editMovieRequest, updatedMovie);
            
            foreach (var genre in genres)
            {
                updatedMovie.GenreMovies.Add(new GenreMovie
                {
                    Movie = updatedMovie,
                    Genre = genre,
                });
            }
            
            await _unitOfWork.MovieRepository.UpdateAsync(updatedMovie);
            await _unitOfWork.CommitAsync();

            return new ServiceResult<Movie>(updatedMovie);
        }

        public async Task<ServiceResult<IEnumerable<MovieRating>>> GetMovieRatings(int movieId)
        {
            if (!await ExistsAsync(movieId))
            {
                return new ServiceResult<IEnumerable<MovieRating>>(ErrorCode.MovieNotFound);
            }

            var movieRatings = await _unitOfWork.MovieRepository.GetMovieRating(movieId);

            return new ServiceResult<IEnumerable<MovieRating>>(movieRatings);
        }

        public async Task<ServiceResult<MovieRatingValueModel>> RecalculateMovieRatingAsync(int movieId)
        {
            var movie = await _unitOfWork.MovieRepository.GetMovieWithRatings(movieId);
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

            _unitOfWork.MovieRepository.SetMovieRatingIsModified(movie);
            await _unitOfWork.CommitAsync();

            var result = new MovieRatingValueModel
            {
                Value = movie.Rating
            };
            
            return new ServiceResult<MovieRatingValueModel>(result);
        }
        
        public async Task<ServiceResult<IReadOnlyList<MovieCommentsResponse>>> GetMovieComments(int movieId)
        {
            if (!await ExistsAsync(movieId))
            {
                return new ServiceResult<IReadOnlyList<MovieCommentsResponse>>(ErrorCode.MovieNotFound);
            }

            var movieComments = await _unitOfWork.MovieRepository.GetMovieWithComments(movieId);
            
            return new ServiceResult<IReadOnlyList<MovieCommentsResponse>>(movieComments);
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _unitOfWork.DisposeAsync();
        }
    }
}
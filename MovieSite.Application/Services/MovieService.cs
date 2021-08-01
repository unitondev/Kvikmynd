using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.DTO.Responses;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class MovieService : IMovieService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MovieService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<MovieResponse>> GetAllMoviesAsync()
        {
            var movies = await _unitOfWork.MovieRepository.GetAllAsync();
            IList<MovieResponse> movieResponses = new List<MovieResponse>();
            foreach (var movie in movies)
            {
                movieResponses.Add(_mapper.Map<Movie, MovieResponse>(movie));
            }

            return movieResponses;
        }

        public async Task<MovieResponse> GetMovieByIdAsync(int movieId)
        {
            var movie = await _unitOfWork.MovieRepository.GetByIdOrDefaultAsync(movieId);
            return _mapper.Map<Movie, MovieResponse>(movie);
        }
        
        public async Task<Movie> GetMovieWithGenresByIdAsync(int movieId)
        {
            return await _unitOfWork.MovieRepository.GetMovieWithGenresById(movieId);
        }
        
        public async Task<Result<Movie>> CreateMovieAsync(MovieRequest movieRequest)
        {
            var createdMovie = await _unitOfWork.MovieRepository.FindByTitleAsync(movieRequest.Title);
            if (createdMovie != null)
                return Result<Movie>.BadRequest(Error.MovieAlreadyExists);

            List<Genre> genres = new List<Genre>();
            
            foreach (var requestedGenre in movieRequest.Genres)
            {
                var genre = await _unitOfWork.GenreRepository.FindByNameAsync(requestedGenre);
                if (genre == null)
                    return Result<Movie>.NotFound(Error.GenreNotFound);
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

            await _unitOfWork.MovieRepository.AddAsync(createdMovie);
            await _unitOfWork.CommitAsync();
            return Result<Movie>.Success(createdMovie);
        }
        
        public async Task<Result<Movie>> UpdateMovieAsync(EditMovieRequest editMovieRequest)
        {
            var updatedMovie = await _unitOfWork.MovieRepository.FindByTitleForUpdateAsync(editMovieRequest.Title);
            if(updatedMovie == null)
                return Result<Movie>.NotFound(Error.MovieNotFound);

            List<Genre> genres = new List<Genre>();
            
            foreach (var requestedGenre in editMovieRequest.Genres)
            {
                var genre = await _unitOfWork.GenreRepository.FindByNameAsync(requestedGenre);
                if (genre == null)
                    return Result<Movie>.NotFound(Error.GenreNotFound);
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
            return Result<Movie>.Success(updatedMovie);
        }

        public async Task<Result<IList<MovieRating>>> GetMovieRatings(int movieId)
        {
            if (!await _unitOfWork.MovieRepository.IsContains(movieId))
            {
                Result<IReadOnlyList<MovieCommentsResponse>>.NotFound(Error.MovieNotFound);
            }
            var movieRatings = await _unitOfWork.MovieRepository.GetMovieRating(movieId);

            return Result<IList<MovieRating>>.Success(movieRatings);
        }

        public async Task<Result<double>> RecalculateMovieRatingAsync(int movieId)
        {
            var movie = await _unitOfWork.MovieRepository.GetMovieWithRatings(movieId);
            if (movie == null)
                return Result<double>.NotFound(Error.MovieNotFound);

            if (movie.MovieRatings.Count == 0)
                return Result<double>.NotFound(Error.MovieRatingNotFound);

            var ratingsSum = movie.MovieRatings.Sum(movieRating => movieRating.Value);
            
            movie.Rating = (double)ratingsSum / movie.MovieRatings.Count;
            _unitOfWork.MovieRepository.SetMovieRatingIsModified(movie);
            await _unitOfWork.CommitAsync();
            return Result<double>.Success(movie.Rating);
        }
        
        public async Task<Result<IReadOnlyList<MovieCommentsResponse>>> GetMovieComments(int movieId)
        {
            if (!await _unitOfWork.MovieRepository.IsContains(movieId))
            {
                Result<IReadOnlyList<MovieCommentsResponse>>.NotFound(Error.MovieNotFound);
            }
            var movieComments = await _unitOfWork.MovieRepository.GetMovieWithComments(movieId);
            return Result<IReadOnlyList<MovieCommentsResponse>>.Success(movieComments);
        }

        public async Task DeleteMovieByIdAsync(int movieId)
        {
            await _unitOfWork.MovieRepository.DeleteByIdAsync(movieId);
            await _unitOfWork.CommitAsync();
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
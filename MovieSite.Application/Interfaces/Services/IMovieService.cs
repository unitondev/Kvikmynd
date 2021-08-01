using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.DTO.Responses;
using MovieSite.Application.Helper;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieResponse>> GetAllMoviesAsync();
        Task<MovieResponse> GetMovieByIdAsync(int movieId);
        Task<Movie> GetMovieWithGenresByIdAsync(int movieId);
        Task<Result<Movie>> CreateMovieAsync(MovieRequest movieRequest);
        Task<Result<Movie>> UpdateMovieAsync(EditMovieRequest uEditMovieRequest);
        Task<Result<IList<MovieRating>>> GetMovieRatings(int movieId);
        Task<Result<double>> RecalculateMovieRatingAsync(int movieId);
        Task<Result<IReadOnlyList<MovieCommentsResponse>>> GetMovieComments(int movieId);
        Task DeleteMovieByIdAsync(int movieId);
    }
}
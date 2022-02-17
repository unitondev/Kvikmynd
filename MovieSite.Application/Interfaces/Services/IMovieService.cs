using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IMovieService : IService<Movie>
    {
        Task<IEnumerable<MovieResponse>> GetAllMoviesAsync();
        Task<MovieWithGenresResponse> GetMovieWithGenresByIdAsync(int movieId);
        Task<ServiceResult<Movie>> CreateMovieAsync(MovieRequest movieRequest);
        Task<ServiceResult<Movie>> UpdateMovieAsync(EditMovieRequest uEditMovieRequest);
        Task<ServiceResult<IEnumerable<MovieRating>>> GetMovieRatings(int movieId);
        Task<ServiceResult<MovieRatingValueModel>> RecalculateMovieRatingAsync(int movieId);
        Task<ServiceResult<IReadOnlyList<MovieCommentsResponse>>> GetMovieComments(int movieId);
    }
}
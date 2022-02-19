using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;
using MovieSite.ViewModels;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IMovieService : IService<Movie>
    {
        Task<IEnumerable<MovieViewModel>> GetAllMoviesAsync();
        Task<MovieWithGenresViewModel> GetMovieWithGenresByIdAsync(int movieId);
        Task<ServiceResult<Movie>> CreateMovieAsync(MovieModel model);
        Task<ServiceResult<Movie>> UpdateMovieAsync(EditMovieModel model);
        Task<ServiceResult<IEnumerable<MovieRating>>> GetMovieRatings(int id);
        Task<ServiceResult<MovieRatingValueModel>> RecalculateMovieRatingAsync(int id);
        Task<ServiceResult<List<MovieCommentsViewModel>>> GetMovieComments(int id);
    }
}
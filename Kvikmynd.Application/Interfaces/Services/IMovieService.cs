using System.Collections.Generic;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IMovieService : IService<Movie>
    {
        Task<GenericTotalCountViewModel<MovieWithGenresAndRatingsViewModel>> GetAllMoviesAsync(SearchQueryModel model);
        Task<MovieWithGenresViewModel> GetMovieWithGenresByIdAsync(int movieId);
        Task<ServiceResult<IEnumerable<MovieRating>>> GetMovieRatings(int id);
        Task<ServiceResult<List<MovieCommentsViewModel>>> GetMovieComments(int id);
    }
}
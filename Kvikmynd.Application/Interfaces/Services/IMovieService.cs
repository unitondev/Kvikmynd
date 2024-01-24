using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Models.Request;
using Kvikmynd.Application.Models.Response;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IMovieService : IService<Movie>
    {
        Task<TotalCountViewModel<MovieWithGenresAndRatingsViewModel>> GetAllMoviesAsync(SearchQueryModel model, CancellationToken cancellationToken);
        Task<MovieWithGenresViewModel> GetMovieWithGenresByIdAsync(int movieId);
        Task<ServiceResult<List<MovieCommentsViewModel>>> GetMovieComments(int id);
        Task<TotalCountViewModel<MovieWithRatingsModel>> GetMoviesWithRatingByUserIdAsync(GetMoviesRatingsModel model);
        Task<IEnumerable<GetSimilarMovieModel>> GetSimilarMoviesAsync(GetSimilarMoviesRequestModel model, int userId);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Repositories
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task<List<MovieCommentsViewModel>> GetMovieCommentsAsync(int id);
        Task<MovieWithGenresModel> GetMovieWithGenresByIdAsync(int id);
        Task<List<MovieWithGenresAndRatingsModel>> GetMovieWithGenresAndRatingsAsync();
    }
}
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IRatingService : IService<MovieRating>
    {
        Task<ServiceResult<MovieRating>> GetByUserAndMovieIdAsync(int userId, int movieId);
    }
}
using System.Threading.Tasks;
using MovieSite.Application.Common.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IRatingService : IService<MovieRating>
    {
        Task<ServiceResult<MovieRating>> GetByUserAndMovieIdAsync(int userId, int movieId);
    }
}
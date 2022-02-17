using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IRatingService : IService<MovieRating>
    {
        Task<MovieRating> GetByUserAndMovieIdAsync(int userId, int movieId);
    }
}
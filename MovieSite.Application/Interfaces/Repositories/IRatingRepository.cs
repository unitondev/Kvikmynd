using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IRatingRepository : IRepository<MovieRating>
    {
        Task<MovieRating> GetByUserAndMovieIdAsync(int userId, int movieId);
    }
}
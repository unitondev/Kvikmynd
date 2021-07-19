using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IRatingRepository : IRepositoryAsync<MovieRating>
    {
        Task<MovieRating> GetRatingByUserAndMovieIdAsync(int userId, int movieId);
        Task DeleteRatingByUserAndMovieIdAsync(int userId, int movieId);
    }
}
using System.Threading.Tasks;
using MovieSite.Application.Helper;
using MovieSite.Application.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IRatingService
    {
        Task<Result<int>> GetRatingByUserAndMovieIdAsync(RatingRequest ratingRequest);
        Task<Result<int>> CreateRatingAsync(CreateRatingRequest ratingRequest);
        Task DeleteRatingByUserAndMovieIdAsync(RatingRequest ratingRequest);
    }
}
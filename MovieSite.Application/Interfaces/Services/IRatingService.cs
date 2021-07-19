using System.Threading.Tasks;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IRatingService
    {
        Task<Result<int>> GetRatingByUserAndMovieIdAsync(RatingRequest ratingRequest);
        Task CreateRatingAsync(CreateRatingRequest ratingRequest);
        Task DeleteRatingByUserAndMovieIdAsync(RatingRequest ratingRequest);
    }
}
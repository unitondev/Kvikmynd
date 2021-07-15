using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IRatingService
    {
        Task<IEnumerable<Rating>> GetRatingsAsync();
        Task<Rating> GetRatingByIdAsync(int ratingId);
        Task<Rating> CreateRatingAsync(Rating rating);
        Task<Rating> UpdateRatingAsync(Rating rating);
        Task<bool> DeleteRatingByIdAsync(int ratingId);
    }
}
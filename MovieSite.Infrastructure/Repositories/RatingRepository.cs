using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class RatingRepository : RepositoryAsync<MovieRating>, IRatingRepository
    {
        private readonly DbContext _dbContext;

        public RatingRepository(DbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<MovieRating> GetRatingByUserAndMovieIdAsync(int userId, int movieId)
        {
            return await _dbContext.Set<MovieRating>()
                .FirstOrDefaultAsync(rating => rating.MovieId == movieId && rating.UserId == userId);
        }
        
        public async Task DeleteRatingByUserAndMovieIdAsync(int userId, int movieId)
        {
            var entity = await _dbContext.Set<MovieRating>()
                .FirstOrDefaultAsync(rating => rating.MovieId == movieId && rating.UserId == userId);
            await Task.Run(() => _dbContext.Set<MovieRating>().Remove(entity));
        }
    }
}
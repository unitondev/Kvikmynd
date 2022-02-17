using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class RatingRepository : GenericRepository<MovieRating>, IRatingRepository
    {
        public RatingRepository(DbContext dbContext) : base(dbContext) { }

        public async Task<MovieRating> GetByUserAndMovieIdAsync(int userId, int movieId)
        {
            return await DbSet.FirstOrDefaultAsync(rating => rating.MovieId == movieId && rating.UserId == userId);
        }
    }
}
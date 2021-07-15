using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class RatingRepository : RepositoryAsync<Rating>, IRatingRepository
    {
        public RatingRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
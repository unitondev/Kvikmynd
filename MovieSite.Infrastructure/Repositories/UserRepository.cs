using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class UserRepository : RepositoryAsync<User>, IUserRepository
    {
        private MovieSiteDbContext _dbContext { get; set; }

        public UserRepository(DbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext as MovieSiteDbContext;
        }

        public async Task<User> FirstOrDefaultAsync(Expression<Func<User, bool>> predicate)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(predicate);
        }
    }
}
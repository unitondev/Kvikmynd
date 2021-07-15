using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IUserRepository : IRepositoryAsync<User>
    {
        Task<User> FirstOrDefaultAsync(Expression<Func<User, bool>> predicate);
    }
}
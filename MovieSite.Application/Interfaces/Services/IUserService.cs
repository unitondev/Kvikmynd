using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> GetByIdOrDefaultAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<bool> CreateAsync(User item);
        Task<int> CreateRangeAsync(IEnumerable<User> items);
        Task<bool> DeleteByIdAsync(int id);
        Task<AuthResponseUser> AuthenticateAsync(AuthRequestUser authRequestUser);
        Task<AuthResponseUser> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
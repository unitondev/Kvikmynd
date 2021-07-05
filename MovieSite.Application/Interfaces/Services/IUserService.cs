using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO;
using MovieSite.Application.ViewModel;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> GetByIdOrDefaultAsync(Guid id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<bool> CreateAsync(UserRegisterViewModel item);
        // Task<int> CreateRangeAsync(IEnumerable<User> items);
        Task<bool> DeleteByIdAsync(Guid id);
        Task<AuthResponseUser> AuthenticateAsync(AuthRequestUser authRequestUser);
        Task<AuthResponseUser> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
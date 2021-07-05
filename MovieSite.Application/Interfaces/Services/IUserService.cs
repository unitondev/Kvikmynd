using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO;
using MovieSite.Application.DTO.Requests;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> GetByIdOrDefaultAsync(Guid id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<bool> CreateAsync(UserRegisterRequest item);
        Task<bool> DeleteByIdAsync(Guid id);
        Task<AuthResponseUser> AuthenticateAsync(AuthRequestUser authRequestUser);
        Task<AuthResponseUser> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
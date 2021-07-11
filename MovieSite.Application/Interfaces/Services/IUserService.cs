using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> GetByIdOrDefaultAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<bool> CreateAsync(UserRegisterRequest item);
        Task<bool> DeleteByIdAsync(int id);
        Task<Result<AuthResponseUser>> AuthenticateAsync(AuthRequestUser authRequestUser);
        Task<Result<AuthResponseUser>> RefreshTokenAsync(string token);
        Task RevokeTokenAsync(User user, RefreshToken token);
        Task<bool> RevokeTokenAsync(string revokedTokenPlainText);
        Task<Result<bool>> LogOut(string jwtTokenPlainText);
    }
}
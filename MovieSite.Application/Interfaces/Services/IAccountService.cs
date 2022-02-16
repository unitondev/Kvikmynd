using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.Helper;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IAccountService
    {
        Task<User> GetByIdOrDefaultAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<Result<AuthResponseUser>> CreateAsync(UserRegistrationModel item);
        Task DeleteByIdAsync(string id);
        Task DeleteByIdFromJwtAsync(string jwtTokenPlainText);
        Task<Result<AuthResponseUser>> AuthenticateAsync(LoginUserModel loginUserModel);
        Task<Result<AuthResponseUser>> RefreshTokenAsync(string token);
        Task RevokeTokenAsync(User user, RefreshToken token);
        Task<bool> RevokeTokenAsync(string revokedTokenPlainText);
        Task LogOut(string jwtTokenPlainText);
        Task<Result<EditUserResponse>> UpdateUserAsync(EditUserRequest requestedUser);
    }
}
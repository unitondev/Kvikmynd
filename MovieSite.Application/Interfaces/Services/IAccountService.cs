using System.Threading.Tasks;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IAccountService
    {
        Task<User> FindByIdAsync(int id);
        Task<ServiceResult<User>> FindByEmailAsync(string email);
        Task<ServiceResult<User>> FindByEmailAndCheckCredentialsAsync(string email, string password);
        Task<ServiceResult<AuthResponseUser>> RegisterAsync(UserRegistrationModel item);
        Task<ServiceResult> DeleteByIdAsync(string id);
        Task<ServiceResult> DeleteByJwtTokenAsync(string jwtTokenPlainText);
        Task<ServiceResult<AuthResponseUser>> LoginAsync(LoginUserModel loginUserModel);
        Task<ServiceResult<AuthResponseUser>> RefreshTokenAsync(string token);
        Task<ServiceResult> RevokeTokenAsync(User user, RefreshToken token);
        Task<ServiceResult> RevokeTokenAsync(string revokedTokenPlainText);
        Task<ServiceResult> LogOut(string jwtTokenPlainText);
        Task<ServiceResult<EditUserResponse>> UpdateUserAsync(EditUserRequest requestedUser);
        Task<ServiceResult<User>> GetCurrentUserAsync(string jwtPlainText);
    }
}
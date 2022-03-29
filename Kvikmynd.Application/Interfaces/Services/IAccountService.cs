using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IAccountService
    {
        Task<User> FindByIdAsync(int id);
        Task<ServiceResult<User>> FindByEmailAsync(string email);
        Task<ServiceResult<User>> FindByEmailAndCheckCredentialsAsync(string email, string password);
        Task<ServiceResult<User>> RegisterAsync(UserRegistrationModel item);
        Task<ServiceResult<RefreshAndJwtTokenModel>> RefreshTokenAsync(string token);
        Task<ServiceResult> RevokeTokenAsync(User user, RefreshToken token);
        Task<ServiceResult> RevokeTokenAsync(string revokedTokenPlainText);
        Task<ServiceResult> LogOut(string userId);
        Task<ServiceResult<UpdatedUserViewModel>> UpdateUserAsync(UpdateUserModel model);
        Task<ServiceResult<RefreshToken>> GenerateAndSetRefreshToken(int userId);
        Task<ServiceResult<User>> GetCurrentUserAsync();
        Task<int> GetCurrentUserIdAsync();
    }
}
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;

namespace Kvikmynd.Application.Services
{
    public class AccountService : IAccountService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _work;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IFileUploadService _fileUploadService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountService(
            IUnitOfWork work,
            UserManager<User> userManager,
            IMapper mapper,
            ITokenService tokenService,
            IFileUploadService fileUploadService,
            IHttpContextAccessor httpContextAccessor
            )
        {
            _work = work;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _fileUploadService = fileUploadService;
            _httpContextAccessor = httpContextAccessor;
        }
        
        public async Task<User> FindByIdAsync(int userId)
        {
            return await _userManager.FindByIdAsync(userId.ToString());
        }

        public async Task<ServiceResult<User>> FindByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResult<User>(ErrorCode.UserNotFound);
            }

            return new ServiceResult<User>(user);
        }
        
        public async Task<ServiceResult<User>> FindByEmailAndCheckCredentialsAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResult<User>(ErrorCode.UserNotFound);
            }
            
            var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user);
            if (!isEmailConfirmed)
            {
                return new ServiceResult<User>(ErrorCode.EmailDoesNotConfirmed);
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, password);
            if (!isPasswordValid)
            {
                return new ServiceResult<User>(ErrorCode.CredentialsInvalid);
            }
            
            return new ServiceResult<User>(user);
        }
        
        public async Task<ServiceResult<User>> RegisterAsync(UserRegistrationModel model)
        {
            var registeredUser = await _userManager.FindByEmailAsync(model.Email) 
                                 ?? await _userManager.FindByNameAsync(model.Username);

            if (registeredUser != null)
            {
                return new ServiceResult<User>(ErrorCode.UserAlreadyExists);
            }
            
            var createdUser = _mapper.Map<UserRegistrationModel, User>(model);
            if (model.Avatar?.Length > 0)
            {
                createdUser.AvatarUrl = await _fileUploadService.UploadImageToFirebaseAsync(model.Avatar, "avatars");
            }
            else
            {
                var defaultAvatarBytes = await File.ReadAllBytesAsync(@"../Kvikmynd.Infrastructure/Covers/defaultUserAvatar.png");
                createdUser.AvatarUrl = await _fileUploadService.UploadImageToFirebaseAsync(Convert.ToBase64String(defaultAvatarBytes), "avatars");
            }

            var result = await _userManager.CreateAsync(createdUser, model.Password);
            if (!result.Succeeded)
            {
                return new ServiceResult<User>(ErrorCode.UserNotCreated);
            }

            var roleResult = await _userManager.AddToRoleAsync(createdUser, Role.User.ToString());
            if (!roleResult.Succeeded)
            {
                return new ServiceResult<User>(ErrorCode.UserNotCreated);
            }

            return new ServiceResult<User>(createdUser);
        }
        
        public async Task<ServiceResult<RefreshToken>> GenerateAndSetRefreshToken(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return new ServiceResult<RefreshToken>(ErrorCode.UserNotFound);
            
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            
            var result =  await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return new ServiceResult<RefreshToken>(ErrorCode.Unspecified);

            return new ServiceResult<RefreshToken>(refreshToken);
        }

        public async Task<ServiceResult> LogOut(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResult(ErrorCode.UserNotFound);
            }
            
            foreach (var refreshToken in user.RefreshTokens)
            {
                if (refreshToken.IsActive) await RevokeTokenAsync(user, refreshToken);
            }

            return new ServiceResult();
        }

        public async Task<ServiceResult<UpdatedUserViewModel>> UpdateUserAsync(UpdateUserModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResult<UpdatedUserViewModel>(ErrorCode.UserNotFound);
            }

            _mapper.Map<UpdateUserModel, User>(model, user);
            if (model.Avatar?.Length > 0)
            {
                user.AvatarUrl = await _fileUploadService.UploadImageToFirebaseAsync(model.Avatar, "avatars");
            }
            else
            {
                var defaultAvatarBytes = await File.ReadAllBytesAsync(@"../Kvikmynd.Infrastructure/Covers/defaultUserAvatar.png");
                user.AvatarUrl = await _fileUploadService.UploadImageToFirebaseAsync(Convert.ToBase64String(defaultAvatarBytes), "avatars");
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return new ServiceResult<UpdatedUserViewModel>(ErrorCode.UserNotUpdated);
            }

            var responseUser = _mapper.Map<User, UpdatedUserViewModel>(user);
            
            return new ServiceResult<UpdatedUserViewModel>(responseUser);
        }

        public async Task<ServiceResult<RefreshAndJwtTokenModel>> RefreshTokenAsync(string refreshedTokenPlainText)
        {
            var refreshedUser = await _work.UserRepository.FindAsync(i => i.RefreshTokens
                .Any(t => t.Token == refreshedTokenPlainText));

            if (refreshedUser == null)
            {
                return new ServiceResult<RefreshAndJwtTokenModel>(ErrorCode.AccessTokenNotFound);
            }

            var refreshedToken = refreshedUser.RefreshTokens.FirstOrDefault(t => t.Token == refreshedTokenPlainText);

            if (!refreshedToken.IsActive) return new ServiceResult<RefreshAndJwtTokenModel>(ErrorCode.AccessTokenIsNotActive);
            refreshedToken.Revoked = DateTime.Now;
            
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(refreshedUser.Id))
            };

            var newJwtResponseModel = _tokenService.GetJwtResponseModel(claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            
            refreshedUser.RefreshTokens.Add(newRefreshToken);
            await _work.UserRepository.UpdateAsync(refreshedUser);
            await _work.CommitAsync();

            var result = new RefreshAndJwtTokenModel
            {
                RefreshToken = newRefreshToken,
                JwtResponseModel = newJwtResponseModel
            };

            return new ServiceResult<RefreshAndJwtTokenModel>(result);
        }

        public async Task<ServiceResult> RevokeTokenAsync(User user, RefreshToken revokedToken)
        {
            revokedToken.Revoked = DateTime.Now;
            await _work.UserRepository.UpdateAsync(user);     
            await _work.CommitAsync();

            return new ServiceResult();
        }
        
        public async Task<ServiceResult> RevokeTokenAsync(string revokedTokenPlainText)
        {
            var user = await _work.UserRepository.FindAsync(i =>
                i.RefreshTokens.Any(t => t.Token == revokedTokenPlainText));
            
            if (user == null) return new ServiceResult(ErrorCode.UserNotFound);

            var revokedToken = user.RefreshTokens.FirstOrDefault(token => token.Token == revokedTokenPlainText);
            if (!revokedToken.IsActive) return new ServiceResult(ErrorCode.AccessTokenIsNotActive);;

            revokedToken.Revoked = DateTime.Now;

            await _work.UserRepository.UpdateAsync(user);     
            await _work.CommitAsync();

            return new ServiceResult();
        }

        public async Task<ServiceResult<User>> GetCurrentUserAsync()
        {
            var userId = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(c => 
                c.Properties.Values.Contains(JwtRegisteredClaimNames.Sub))?.Value;

            var user = await FindByIdAsync(Convert.ToInt32(userId));
            if (user == null) return new ServiceResult<User>(ErrorCode.UserNotFound);
            return new ServiceResult<User>(user);
        }

        public async Task<int> GetCurrentUserIdAsync()
        {
            var result = await GetCurrentUserAsync();
            return result.Result?.Id ?? -1;
        }

        public void Dispose()
        {
            _work.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _work.DisposeAsync();
        }
    }
}
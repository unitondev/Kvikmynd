using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MovieSite.Application.Authentication;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Jwt;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class AccountService : IAccountService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _work;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AccountService(
            IUnitOfWork work,
            UserManager<User> userManager,
            IMapper mapper,
            ITokenService tokenService)
        {
            _work = work;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
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

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, password);
            if (!isPasswordValid)
            {
                return new ServiceResult<User>(ErrorCode.CredentialsInvalid);
            }
            
            return new ServiceResult<User>(user);
        }
        
        public async Task<ServiceResult<RefreshAndJwtTokenModel>> RegisterAsync(UserRegistrationModel model)
        {
            var registeredUser = await _userManager.FindByEmailAsync(model.Email) 
                                 ?? await _userManager.FindByNameAsync(model.Username);

            if (registeredUser != null)
            {
                return new ServiceResult<RefreshAndJwtTokenModel>(ErrorCode.UserAlreadyExists);
            }
            
            var createdUser = _mapper.Map<UserRegistrationModel, User>(model);

            var refreshToken = _tokenService.GenerateRefreshToken();
            createdUser.RefreshTokens.Add(refreshToken);

            var result = await _userManager.CreateAsync(createdUser, model.Password);
            if (!result.Succeeded)
            {
                return new ServiceResult<RefreshAndJwtTokenModel>(ErrorCode.UserNotCreated);
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(createdUser.Id))
            };

            var jwtToken = _tokenService.GetJwtToken(claims);
            
            var refreshAndJwtTokenModel = new RefreshAndJwtTokenModel
            {
                RefreshToken = refreshToken,
                JwtToken = jwtToken
            };

            return new ServiceResult<RefreshAndJwtTokenModel>(refreshAndJwtTokenModel);
        }
        
        public async Task<ServiceResult> DeleteByIdAsync(string userId)
        {
            var deletedUser = await _userManager.FindByIdAsync(userId);
            if (deletedUser == null)
            {
                return new ServiceResult(ErrorCode.UserNotFound);
            }
            
            var result = await _userManager.DeleteAsync(deletedUser);
            if (!result.Succeeded)
            {
                return new ServiceResult(ErrorCode.UserNotDeleted);
            }

            return new ServiceResult();
        }
        
        public async Task<ServiceResult> DeleteByJwtTokenAsync(string jwtTokenPlainText)
        {
            var userId = GetIdFromFromJwtToken(jwtTokenPlainText);
            if (userId.Length == 0)
            {
                return new ServiceResult(ErrorCode.UserNotFound);
            }
            
            var result = await DeleteByIdAsync(userId);
            if (!result.IsSucceeded)
            {
                return new ServiceResult(ErrorCode.UserNotDeleted);
            }
            
            return new ServiceResult();
        }

        public async Task<ServiceResult<RefreshToken>> GenerateAndSetRefreshToken(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return new ServiceResult<RefreshToken>(ErrorCode.UserNotFound);
            
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            
            await _work.UserRepository.UpdateAsync(user);
            await _work.CommitAsync();

            return new ServiceResult<RefreshToken>(refreshToken);
        }

        public async Task<ServiceResult> LogOut(string jwtTokenPlainText)
        {
            var userId = GetIdFromFromJwtToken(jwtTokenPlainText);
            var user = await _userManager.FindByIdAsync(Convert.ToString(userId));
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

        public async Task<ServiceResult<EditUserResponse>> UpdateUserAsync(EditUserRequest requestedUser)
        {
            var user = await _userManager.FindByEmailAsync(requestedUser.Email);
            if (user == null)
            {
                return new ServiceResult<EditUserResponse>(ErrorCode.UserNotFound);
            }

            _mapper.Map<EditUserRequest, User>(requestedUser, user);

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return new ServiceResult<EditUserResponse>(ErrorCode.UserNotUpdated);
            }

            if (!string.IsNullOrEmpty(requestedUser.NewPassword) && !string.IsNullOrEmpty(requestedUser.OldPassword))
            {
                var changePasswordResult = await _userManager.ChangePasswordAsync(user, requestedUser.OldPassword, requestedUser.NewPassword);
                if (!changePasswordResult.Succeeded)
                {
                    return new ServiceResult<EditUserResponse>(ErrorCode.UserNotUpdated);
                }
            }

            var responseUser = _mapper.Map<User, EditUserResponse>(user);
            
            return new ServiceResult<EditUserResponse>(responseUser);
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

            var newJwtToken = _tokenService.GetJwtToken(claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            
            refreshedUser.RefreshTokens.Add(newRefreshToken);
            await _work.UserRepository.UpdateAsync(refreshedUser);
            await _work.CommitAsync();

            var result = new RefreshAndJwtTokenModel
            {
                RefreshToken = newRefreshToken,
                JwtToken = newJwtToken
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

        public async Task<ServiceResult<User>> GetCurrentUserAsync(string jwtPlainText)
        {
            var userId = GetIdFromFromJwtToken(jwtPlainText);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return new ServiceResult<User>(ErrorCode.UserNotFound);

            return new ServiceResult<User>(user);
        }

        private static string GetIdFromFromJwtToken(string jwtPlainText)
        {
            var jwtClaimsDictionary = JwtDecoder.DecodeJwt(jwtPlainText);
            return jwtClaimsDictionary["userId"];
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
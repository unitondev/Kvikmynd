using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
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

        public async Task<ServiceResult<AuthResponseUser>> RegisterAsync(UserRegistrationModel model)
        {
            var registeredUser = await _userManager.FindByEmailAsync(model.Email) 
                                 ?? await _userManager.FindByNameAsync(model.Username);

            if (registeredUser != null)
            {
                return new ServiceResult<AuthResponseUser>(ErrorCode.UserAlreadyExists);
            }
            
            var createdUser = _mapper.Map<UserRegistrationModel, User>(model);

            var refreshToken = _tokenService.GenerateRefreshToken();
            createdUser.RefreshTokens.Add(refreshToken);

            var result = await _userManager.CreateAsync(createdUser, model.Password);
            if (!result.Succeeded)
            {
                return new ServiceResult<AuthResponseUser>(ErrorCode.UserNotCreated);
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(createdUser.Id))
            };

            var jwtToken = _tokenService.GetJwtToken(claims);
            
            var responseUser = new AuthResponseUser(createdUser, jwtToken, refreshToken.Token);

            return new ServiceResult<AuthResponseUser>(responseUser);
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

        // TODO delete it, it never used anymore
        public async Task<ServiceResult<AuthResponseUser>> LoginAsync(LoginUserModel loginUserModel)
        {
            var user = await _userManager.FindByEmailAsync(loginUserModel.Email);
            if (user == null)
            {
                return new ServiceResult<AuthResponseUser>(ErrorCode.UserNotFound);
            }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginUserModel.Password);
            if (!isPasswordCorrect)
            {
                return new ServiceResult<AuthResponseUser>(ErrorCode.PasswordIsNotCorrect);
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(user.Id))
            };

            var jwtToken = _tokenService.GetJwtToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);

            await _work.UserRepository.UpdateAsync(user);
            await _work.CommitAsync();

            var authResponseUser = new AuthResponseUser(user, jwtToken, refreshToken.Token);

            return new ServiceResult<AuthResponseUser>(authResponseUser);
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

        public async Task<ServiceResult<AuthResponseUser>> RefreshTokenAsync(string refreshedTokenPlainText)
        {
            var refreshedUser = await _work.UserRepository.FindAsync(i =>
                i.RefreshTokens.Any(t => t.Token == refreshedTokenPlainText));

            if (refreshedUser == null)
            {
                return new ServiceResult<AuthResponseUser>(ErrorCode.AccessTokenNotFound);
            }

            var refreshedToken = refreshedUser.RefreshTokens.FirstOrDefault(t => t.Token == refreshedTokenPlainText);

            if (!refreshedToken.IsActive) return new ServiceResult<AuthResponseUser>(ErrorCode.AccessTokenIsNotActive);

            var newRefreshToken = _tokenService.GenerateRefreshToken();
            refreshedToken.Revoked = DateTime.Now;
            refreshedToken.ReplacedByToken = newRefreshToken.Token;
            refreshedUser.RefreshTokens.Add(newRefreshToken);

            await _work.UserRepository.UpdateAsync(refreshedUser);
            await _work.CommitAsync();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(refreshedUser.Id))
            };

            var newJwtToken = _tokenService.GetJwtToken(claims);

            var authResponseUser = new AuthResponseUser(refreshedUser, newJwtToken, newRefreshToken.Token);

            return new ServiceResult<AuthResponseUser>(authResponseUser);
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
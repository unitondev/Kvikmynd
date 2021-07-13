using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MovieSite.Application.DTO;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.DTO.Responses;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Jwt;
using MovieSite.Domain.Models;
// using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace MovieSite.Application.Services
{
    public class UserService : IUserService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IJwtSigningEncodingKey _jwtSigningEncodingKey;

        public UserService(
            IUnitOfWork unitOfWork,
            UserManager<User> userManager,
            IMapper mapper,
            IJwtSigningEncodingKey jwtSigningEncodingKey
            )
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
            _jwtSigningEncodingKey = jwtSigningEncodingKey;
        }
        
        public async Task<User> GetByIdOrDefaultAsync(int id)
        {
            return await _userManager.FindByIdAsync(id.ToString());
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _unitOfWork.UserRepository.GetAllAsync();
        }

        public async Task<Result<AuthResponseUser>> CreateAsync(UserRegisterRequest registerUserRequest)
        {
            var registeredUser = await _userManager.FindByEmailAsync(registerUserRequest.Email) 
                                 ?? await _userManager.FindByNameAsync(registerUserRequest.Username);
            if (registeredUser != null) return Result<AuthResponseUser>.BadRequest(Error.UserAlreadyExists);
            
            var createdUser = _mapper.Map<UserRegisterRequest, User>(registerUserRequest);
            var jwtToken = GenerateJwtToken(createdUser);
            var refreshToken = GenerateRefreshToken();
            createdUser.RefreshTokens.Add(refreshToken);
            await _userManager.CreateAsync(createdUser, registerUserRequest.Password);
            
            var responseUser = new AuthResponseUser(createdUser, jwtToken, refreshToken.Token);
            return Result<AuthResponseUser>.Success(responseUser);
        }
        
        public async Task<bool> DeleteWithJwt(string jwtTokenPlainText)
        {
            var userId = GetIdFromFromJwtText(jwtTokenPlainText);
            return await DeleteByIdAsync(userId);
        }
        
        public async Task<bool> DeleteByIdAsync(string id)
        {
            var deletedUser = await _userManager.FindByIdAsync(id);

            if (deletedUser == null) return false;
            await _userManager.DeleteAsync(deletedUser);
            return true;
        }

        public async Task<Result<AuthResponseUser>> AuthenticateAsync(AuthRequestUser authRequestUser)
        {
            var user = await _userManager.FindByEmailAsync(authRequestUser.Email);

            if (user == null)
                return Result<AuthResponseUser>.NotFound();

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, authRequestUser.Password);

            if (!isPasswordCorrect)
                return Result<AuthResponseUser>.BadRequest(Error.PasswordIsNotCorrect);

            
            var jwtToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshTokens.Add(refreshToken);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.CommitAsync();

            var authResponseUser = new AuthResponseUser(user, jwtToken, refreshToken.Token);

            return Result<AuthResponseUser>.Success(authResponseUser);
        }

        public async Task LogOut(string jwtTokenPlainText)
        {
            var userId = GetIdFromFromJwtText(jwtTokenPlainText);
            var user = await _userManager.FindByIdAsync(Convert.ToString(userId));
            
            foreach (var refreshToken in user.RefreshTokens)
            {
                if (refreshToken.IsActive)
                    await RevokeTokenAsync(user, refreshToken);
            }
        }

        public async Task<Result<EditUserResponse>> UpdateUser(EditUserRequest requestedUser)
        {
            var userEmail = requestedUser.Email;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
                return Result<EditUserResponse>.NotFound();

            _mapper.Map<EditUserRequest, User>(requestedUser, user);
            await _userManager.UpdateAsync(user);
            await _userManager.ChangePasswordAsync(user, requestedUser.OldPassword, requestedUser.NewPassword);

            var responseUser = _mapper.Map<User, EditUserResponse>(user);
            
            return Result<EditUserResponse>.Success(responseUser);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(user.Id))
            };
            
            var token = new JwtSecurityToken(
                Constants.Issuer,
                Constants.Audience, 
                claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(10),
                new SigningCredentials(
                    _jwtSigningEncodingKey.GetKey(),
                    _jwtSigningEncodingKey.SigningAlgorithm));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        private RefreshToken GenerateRefreshToken()
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                };
            }
        }

        public async Task<Result<AuthResponseUser>> RefreshTokenAsync(string refreshedTokenPlainText)
        {
            var refreshedUser = await _unitOfWork.UserRepository.FirstOrDefaultAsync(user =>
                user.RefreshTokens.Any(token => token.Token == refreshedTokenPlainText));

            if (refreshedUser == null)
                return Result<AuthResponseUser>.NotFound();

            var refreshedToken = refreshedUser.RefreshTokens.FirstOrDefault(token => token.Token == refreshedTokenPlainText);
            if (!refreshedToken.IsActive)
                return Result<AuthResponseUser>.BadRequest(Error.TokenIsNotActive); 

            var newRefreshToken = GenerateRefreshToken();
            refreshedToken.Revoked = DateTime.Now;
            refreshedToken.ReplacedByToken = newRefreshToken.Token;
            refreshedUser.RefreshTokens.Add(newRefreshToken);
            _unitOfWork.UserRepository.Update(refreshedUser);
            await _unitOfWork.CommitAsync();

            var newJwtToken = GenerateJwtToken(refreshedUser);
            var authResponseUser = new AuthResponseUser(refreshedUser, newJwtToken, newRefreshToken.Token);
            return Result<AuthResponseUser>.Success(authResponseUser);
        }

        public async Task RevokeTokenAsync(User user, RefreshToken revokedToken)
        {
            revokedToken.Revoked = DateTime.Now;
            _unitOfWork.UserRepository.Update(user);     
            await _unitOfWork.CommitAsync();
        }
        
        public async Task<bool> RevokeTokenAsync(string revokedTokenPlainText)
        {
            var user = await _unitOfWork.UserRepository.FirstOrDefaultAsync(user =>
                user.RefreshTokens.Any(token => token.Token == revokedTokenPlainText));
            
            if (user == null) 
                return false;

            var revokedToken = user.RefreshTokens.FirstOrDefault(token => token.Token == revokedTokenPlainText);
            
            if (!revokedToken.IsActive)
                return false;

            revokedToken.Revoked = DateTime.Now;
            _unitOfWork.UserRepository.Update(user);     
            await _unitOfWork.CommitAsync();

            return true;
        }

        private static string GetIdFromFromJwtText(string jwtPlainText)
        {
            var jwtClaimsDictionary = JwtDecoder.DecodeJwt(jwtPlainText);
            return jwtClaimsDictionary["userId"];
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _unitOfWork.DisposeAsync();
        }
    }
}
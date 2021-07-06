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
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Jwt;
using MovieSite.Domain.Models;
using MovieSite.Jwt;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace MovieSite.Application.Services
{
    public class UserService : IUserService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, UserManager<User> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }
        
        public async Task<User> GetByIdOrDefaultAsync(int id)
        {
            return await _userManager.FindByIdAsync(id.ToString());
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _unitOfWork.UserRepository.GetAllAsync();
        }

        public async Task<bool> CreateAsync(UserRegisterRequest userRegister)
        {
            var registeredUser = await _userManager.FindByEmailAsync(userRegister.Email) 
                                 ?? await _userManager.FindByNameAsync(userRegister.Username);;

            if (registeredUser != null) return false;
            var user = _mapper.Map<UserRegisterRequest, User>(userRegister);
            await _userManager.CreateAsync(user, userRegister.Password);
            return true;
        }
        
        public async Task<bool> DeleteByIdAsync(int id)
        {
            var deletedUser = await _userManager.FindByIdAsync(id.ToString());

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
                return Result<AuthResponseUser>.BadRequest("Password is not correct");

            
            var jwtToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshTokens.Add(refreshToken);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.CommitAsync();

            var authResponseUser = new AuthResponseUser(user, jwtToken, refreshToken.Token);

            return Result<AuthResponseUser>.Success(authResponseUser);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(user.Id))
            };
            
            IJwtSigningEncodingKey signingEncodingKey = new SigningSymetricKey();
            var token = new JwtSecurityToken(
                Constants.Issuer,
                Constants.Audience, 
                claims,
                notBefore: DateTime.Now, 
                expires: DateTime.Now.AddMinutes(10),
                new SigningCredentials(
                    signingEncodingKey.GetKey(),
                    signingEncodingKey.SigningAlgorithm));

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

        public async Task<Result<AuthResponseUser>> RefreshTokenAsync(string refreshToken)
        {
            var refreshedUser = await _unitOfWork.UserRepository.FirstOrDefaultAsync(user =>
                user.RefreshTokens.Any(token => token.Token == refreshToken));

            if (refreshedUser == null)
                return Result<AuthResponseUser>.NotFound();

            var refreshedToken = refreshedUser.RefreshTokens.FirstOrDefault(token => token.Token == refreshToken);
            if (refreshedToken != null && !refreshedToken.IsActive)
                return Result<AuthResponseUser>.BadRequest("Refresh token not found or not active"); 

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
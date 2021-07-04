using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;
using MovieSite.Infrastructure.ViewModels;
using MovieSite.Jwt;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace MovieSite.Application.Services
{
    public class UserService : IUserService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<User> GetByIdOrDefaultAsync(int id)
        {
            return await _unitOfWork.UserRepository.GetByIdOrDefaultAsync(id);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _unitOfWork.UserRepository.GetAllAsync();
        }

        public async Task<bool> CreateAsync(User item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item), "Parameter item can't be null");

            var isUserExists = await _unitOfWork.UserRepository.GetByIdOrDefaultAsync(item.Id) != null;

            if (!isUserExists)
            {
                await _unitOfWork.UserRepository.AddAsync(item);
                await _unitOfWork.CommitAsync();
                return true;
            }

            return false;
        }

        public async Task<int> CreateRangeAsync(IEnumerable<User> items)
        {
            if (items == null)
                throw new ArgumentNullException(nameof(items), "Parameter item can't be null");

            List<User> usersToCreate = new List<User>();
            
            foreach (var user in items)
            {
                if(user == null)
                    break;
                
                var isUserExists = await _unitOfWork.UserRepository.GetByIdOrDefaultAsync(user.Id) != null;
                if (!isUserExists)
                {
                    usersToCreate.Add(user);
                }
            }

            if (usersToCreate.Count != 0)
            {
                await _unitOfWork.UserRepository.AddRangeAsync(usersToCreate);
                await _unitOfWork.CommitAsync();
            }
            return usersToCreate.Count;
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            var isUserExists = await _unitOfWork.UserRepository.GetByIdOrDefaultAsync(id) != null;

            if (!isUserExists) 
                return false;
            
            await _unitOfWork.UserRepository.DeleteByIdAsync(id);
            await _unitOfWork.CommitAsync();
            return true;
        }

        public async Task<AuthResponseUser> AuthenticateAsync(AuthRequestUser authRequestUser)
        {
            var user = await _unitOfWork.UserRepository.FirstOrDefaultAsync(
                user => user.Email == authRequestUser.Email && user.Password == authRequestUser.Password);

            if (user == null)
                return null;

            var jwtToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            
            user.RefreshTokens.Add(refreshToken);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.CommitAsync();

            return new AuthResponseUser(user, jwtToken, refreshToken.Token);
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

        public async Task<AuthResponseUser> RefreshTokenAsync(string refreshToken)
        {
            var user = await _unitOfWork.UserRepository.FirstOrDefaultAsync(user =>
                user.RefreshTokens.Any(t => t.Token == refreshToken));
            
            if (user == null)
                return null;

            var token = user.RefreshTokens.FirstOrDefault(t => t.Token == refreshToken);
            if (!token.IsActive)
                return null;

            var newRefreshToken = GenerateRefreshToken();
            token.Revoked = DateTime.Now;
            token.ReplacedByToken = newRefreshToken.Token;
            user.RefreshTokens.Add(newRefreshToken);
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.CommitAsync();

            var newJwtToken = GenerateJwtToken(user);
            return new AuthResponseUser(user, newJwtToken, newRefreshToken.Token);
        }

        public async Task<bool> RevokeTokenAsync(string refreshToken)
        {
            var user = await _unitOfWork.UserRepository.FirstOrDefaultAsync(user =>
                user.RefreshTokens.Any(t => t.Token == refreshToken));
            
            if (user == null) 
                return false;

            var token = user.RefreshTokens.FirstOrDefault(t => t.Token == refreshToken);
            
            if (!token.IsActive)
                return false;

            token.Revoked = DateTime.Now;
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
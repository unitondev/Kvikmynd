using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

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
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IRepositoryAsync<T> where T : class
    {
        Task<T> GetByIdOrDefaultAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T item);
        Task AddRangeAsync(IEnumerable<T> items);
        Task DeleteByIdAsync(Guid id);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;

namespace MovieSite.Infrastructure.Repositories
{
    public class RepositoryAsync<T> : IRepositoryAsync<T> where T : class 
    {
        private readonly DbContext _dbContext;

        public RepositoryAsync(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<T> GetByIdOrDefaultAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task AddAsync(T item)
        {
            await _dbContext.Set<T>().AddAsync(item);
        }

        public async Task AddRangeAsync(IEnumerable<T> item)
        {
            await _dbContext.Set<T>().AddRangeAsync(item);
        }

        public async Task UpdateAsync(T item)
        {
            await Task.Run(() => _dbContext.Set<T>().Update(item));
        }

        public async Task DeleteByIdAsync(int id)
        {
            var entity = await _dbContext.Set<T>().FindAsync(id);
            _dbContext.Set<T>().Remove(entity);
        }
    }
}
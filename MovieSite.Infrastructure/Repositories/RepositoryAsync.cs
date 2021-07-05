using System;
using System.Collections.Generic;
using System.Threading;
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
        
        public async Task<T> GetByIdOrDefaultAsync(Guid id)
        {
            return await GetByIdOrDefaultAsync(id, CancellationToken.None);
        }
        
        public async Task<T> GetByIdOrDefaultAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _dbContext.Set<T>().FindAsync(id, cancellationToken);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await GetAllAsync(CancellationToken.None);
        }
        
        public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _dbContext.Set<T>().ToListAsync(cancellationToken);
        }

        public async Task AddAsync(T item)
        {
            await AddAsync(item, CancellationToken.None);
        }
        
        public async Task AddAsync(T item, CancellationToken cancellationToken)
        {
            await _dbContext.Set<T>().AddAsync(item, cancellationToken);
        }

        public async Task AddRangeAsync(IEnumerable<T> item)
        {
            await AddRangeAsync(item, CancellationToken.None);
        }
        
        public async Task AddRangeAsync(IEnumerable<T> item, CancellationToken cancellationToken)
        {
            await _dbContext.Set<T>().AddRangeAsync(item, cancellationToken);
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            await DeleteByIdAsync(id, CancellationToken.None);
        }
        
        public async Task DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var entity = await _dbContext.Set<T>().FindAsync(id, cancellationToken);
            _dbContext.Set<T>().Remove(entity);
        }
    }
}
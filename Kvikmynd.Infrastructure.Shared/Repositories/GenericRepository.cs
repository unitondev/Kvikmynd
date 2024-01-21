using System.Linq.Expressions;
using Kvikmynd.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Infrastructure.Shared.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class 
    {
        protected readonly KvikmyndDbContext DbContext;
        protected readonly DbSet<T> DbSet;

        public GenericRepository(DbContext dbContext)
        {
            DbContext = dbContext as KvikmyndDbContext;
            if (DbContext == null) throw new NullReferenceException("DbContext is null");
            
            DbSet = DbContext.Set<T>();
        }

        public virtual IQueryable<T> All(params Expression<Func<T, object>>[] includes)
        {
            var query = DbSet.AsNoTracking().AsQueryable();
            if (includes == null || !includes.Any()) return query;

            return includes.Aggregate(query, ((current, include) => current.Include(include)));
        }

        public virtual async Task<T> FindByKeyAsync(int key)
        {
            return await DbSet.FindAsync(key);
        }

        public virtual async Task<T> FindAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var query = DbSet.AsNoTracking();
            if (includes == null || !includes.Any()) return await query.FirstOrDefaultAsync(expression);
            
            return await includes.Aggregate(query, ((current, include) => current.Include(include))).FirstOrDefaultAsync(expression);;
        }

        public virtual IQueryable<T> Filter(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var query = DbSet.AsNoTracking().Where(expression).AsQueryable();
            if (includes == null || !includes.Any()) return query;
            
            return includes.Aggregate(query, ((current, include) => current.Include(include)));
        }

        public virtual async Task<T> CreateAsync(T entity)
        {
            var result = await DbSet.AddAsync(entity);

            return result.Entity;
        }

        public virtual async Task<IEnumerable<T>> CreateRangeAsync(IEnumerable<T> entities)
        {
            var range = entities.ToList();
            await DbSet.AddRangeAsync(range);

            return range;
        }

        public virtual async Task UpdateAsync(T entity)
        {
            await Task.Run(() => DbSet.Update(entity));
        }

        public virtual async Task DeleteAsync(T entity)
        {
            await Task.Run(() => DbSet.Remove(entity));
        }

        public virtual async Task<int> CountAsync(Expression<Func<T, bool>> expression = null)
        {
            return expression != null ? await DbSet.CountAsync(expression) : await DbSet.CountAsync();
        }
        
        public virtual async Task SaveAsync()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}

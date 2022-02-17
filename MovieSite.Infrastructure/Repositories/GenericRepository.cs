using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;

namespace MovieSite.Infrastructure.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class 
    {
        protected readonly MovieSiteDbContext DbContext;
        protected readonly DbSet<T> DbSet;

        public GenericRepository(DbContext dbContext)
        {
            DbContext = dbContext as MovieSiteDbContext;
            if (DbContext == null) throw new NullReferenceException("DbContext is null");
            
            DbSet = DbContext.Set<T>();
        }

        public virtual IQueryable<T> All()
        {
            return DbSet.AsNoTracking().AsQueryable();
        }

        public virtual async Task<T> FindByKeyAsync(int key)
        {
            return await DbSet.FindAsync(key);
        }

        public virtual async Task<T> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await DbSet.AsNoTracking().FirstOrDefaultAsync(expression);
        }

        public virtual IQueryable<T> Filter(Expression<Func<T, bool>> expression)
        {
            return DbSet.AsNoTracking().Where(expression).AsQueryable();
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

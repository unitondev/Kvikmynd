using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Kvikmynd.Application.Interfaces.Repositories
{
    public interface IRepository
    {
        Task SaveAsync();
    }
    
    public interface IRepository<T, in TKey> : IRepository where T : class
    {
        IQueryable<T> All(params Expression<Func<T, object>>[] includes);
        Task<T> FindByKeyAsync(TKey key);
        Task<T> FindAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
        IQueryable<T> Filter(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
        Task<T> CreateAsync(T entity);
        Task<IEnumerable<T>> CreateRangeAsync(IEnumerable<T> entities);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<int> CountAsync(Expression<Func<T, bool>> expression = null);
    }
    
    public interface IRepository<T> : IRepository<T, int> where T : class{}
}
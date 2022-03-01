using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IService<T, in TKey> where T : class
    {
        IQueryable<T> GetAll(params Expression<Func<T, object>>[] includes);
        Task<bool> ExistsAsync(TKey key);
        Task<T> GetByKeyAsync(TKey key);
        Task<T> FindAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
        IQueryable<T> Filter(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
        Task<ServiceResult<T>> CreateAsync(T entity);
        Task<ServiceResult<IEnumerable<T>>> CreateRangeAsync(IEnumerable<T> entities);
        Task<ServiceResult> UpdateAsync(T entity);
        Task<ServiceResult> DeleteAsync(T entity);
        Task<int> CountAsync(Expression<Func<T, bool>> expression = null);
    }

    public interface IService<T> : IService<T, int> where T : class { }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MovieSite.Application.Common.Services;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IService<T, in TKey> where T : class
    {
        IQueryable<T> GetAll();
        Task<bool> ExistsAsync(TKey key);
        Task<T> GetByKeyAsync(TKey key);
        Task<T> FindAsync(Expression<Func<T, bool>> expression);
        IQueryable<T> Filter(Expression<Func<T, bool>> expression);
        Task<ServiceResult<T>> CreateAsync(T entity);
        Task<ServiceResult<IEnumerable<T>>> CreateRangeAsync(IEnumerable<T> entities);
        Task<ServiceResult> UpdateAsync(T entity);
        Task<ServiceResult> DeleteAsync(T entity);
        Task<int> CountAsync(Expression<Func<T, bool>> expression = null);
    }

    public interface IService<T> : IService<T, int> where T : class { }
}
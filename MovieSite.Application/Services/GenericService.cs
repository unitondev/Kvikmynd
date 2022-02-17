using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;

namespace MovieSite.Application.Services
{
    public class GenericService<T> : IService<T> where T : class
    {
        private readonly IRepository<T> _repository;
        private readonly IUnitOfWork _work;

        public GenericService(IRepository<T> repository, IUnitOfWork work)
        {
            _repository = repository;
            _work = work;
        }
        
        public virtual IQueryable<T> GetAll()
        {
            return _repository.All();
        }

        public virtual async Task<bool> ExistsAsync(int key)
        {
            var entity = await _repository.FindByKeyAsync(key);
            return entity != null;
        }

        public virtual async Task<T> GetByKeyAsync(int key)
        {
            return await _repository.FindByKeyAsync(key);
        }

        public virtual async Task<T> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await _repository.FindAsync(expression);
        }

        public virtual IQueryable<T> Filter(Expression<Func<T, bool>> expression)
        {
            return _repository.Filter(expression);
        }

        public virtual async Task<ServiceResult<T>> CreateAsync(T entity)
        {
            try
            {
                var result = await _repository.CreateAsync(entity);
                await _work.CommitAsync();
                return new ServiceResult<T>(result);
            }
            catch (Exception e)
            {
                // TODO add message from exception
                return new ServiceResult<T>(ErrorCode.EntityNotCreated);
            }
        }

        public virtual async Task<ServiceResult<IEnumerable<T>>> CreateRangeAsync(IEnumerable<T> entities)
        {
            try
            {
                var result = await _repository.CreateRangeAsync(entities);
                await _work.CommitAsync();
                return new ServiceResult<IEnumerable<T>>(result);
            }
            catch (Exception e)
            {
                return new ServiceResult<IEnumerable<T>>(ErrorCode.EntityNotCreated);
            }
        }

        public virtual async Task<ServiceResult> UpdateAsync(T entity)
        {
            try
            {
                await _repository.UpdateAsync(entity);
                await _work.CommitAsync();
                return new ServiceResult();
            }
            catch (Exception e)
            {
                return new ServiceResult(ErrorCode.EntityNotUpdated);
            }
        }

        public virtual async Task<ServiceResult> DeleteAsync(T entity)
        {
            try
            {
                await _repository.DeleteAsync(entity);
                await _work.CommitAsync();
                return new ServiceResult();
            }
            catch (Exception e)
            {
                return new ServiceResult(ErrorCode.EntityNotDeleted);
            }
        }

        public virtual async Task<int> CountAsync(Expression<Func<T, bool>> expression = null)
        {
            return await _repository.CountAsync(expression);
        }
    }
}
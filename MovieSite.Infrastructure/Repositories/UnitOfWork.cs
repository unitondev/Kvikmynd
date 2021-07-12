using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;

namespace MovieSite.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;
        private IUserRepository _userRepository { get; set; }

        public UnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IUserRepository UserRepository
        {
            get { return _userRepository ?? (_userRepository = new UserRepository(_dbContext)); }
        }
        
        public async Task<int> CommitAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
        
        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _dbContext.DisposeAsync();
        }
    }
}
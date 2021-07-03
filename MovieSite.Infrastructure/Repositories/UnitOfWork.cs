using System.Threading;
using System.Threading.Tasks;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MovieSiteDbContext _dbContext;
        private IRepositoryAsync<User> _userRepository { get; set; }

        public UnitOfWork(MovieSiteDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CommitAsync()
        {
            return await CommitAsync(CancellationToken.None);
        }
        
        public IRepositoryAsync<User> UserRepository
        {
            get { return _userRepository ?? (_userRepository = new RepositoryAsync<User>(_dbContext)); }
        }

        public async Task<int> CommitAsync(CancellationToken cancellation)
        {
            return await _dbContext.SaveChangesAsync(cancellation);
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
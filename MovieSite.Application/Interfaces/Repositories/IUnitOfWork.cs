using System.Threading;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IRepositoryAsync<User> UserRepository { get; }

        public Task<int> CommitAsync();
        public Task<int> CommitAsync(CancellationToken cancellation);
    }
}
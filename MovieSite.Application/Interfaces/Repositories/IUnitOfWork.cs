using System;
using System.Threading;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        public IUserRepository UserRepository { get; }

        public Task<int> CommitAsync();
    }
}
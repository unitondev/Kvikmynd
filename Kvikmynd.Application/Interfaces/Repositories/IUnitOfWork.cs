using System;
using System.Threading.Tasks;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        IRepository<User> UserRepository { get; }
        IRepository<Genre> GenreRepository { get; }
        IMovieRepository MovieRepository { get; }
        IRepository<MovieRating> RatingRepository { get; }
        IRepository<Comment> CommentRepository { get; }
        IRepository<ApplicationPermissionEntity> PermissionRepository { get; }
        IRepository<Subscription> SubscriptionRepository { get; }

        Task<int> CommitAsync();
    }
}
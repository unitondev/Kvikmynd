using System;
using System.Threading;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        IRepository<User> UserRepository { get; }
        IGenreRepository GenreRepository { get; }
        IMovieRepository MovieRepository { get; }
        IRatingRepository RatingRepository { get; }
        IRepository<Comment> CommentRepository { get; }
        
        Task<int> CommitAsync();
    }
}
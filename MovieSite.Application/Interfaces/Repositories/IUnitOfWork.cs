using System;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        IRepository<User> UserRepository { get; }
        IRepository<Genre> GenreRepository { get; }
        IMovieRepository MovieRepository { get; }
        IRepository<MovieRating> RatingRepository { get; }
        IRepository<Comment> CommentRepository { get; }
        
        Task<int> CommitAsync();
    }
}
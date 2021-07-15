using System;
using System.Threading;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        public IUserRepository UserRepository { get; }
        public IGenreRepository GenreRepository { get; }
        public IMovieRepository MovieRepository { get; }
        public IRatingRepository RatingRepository { get; }
        public ICommentRepository CommentRepository { get; }
        

        public Task<int> CommitAsync();
    }
}
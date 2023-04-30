using System.Threading.Tasks;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;

        private IRepository<User> _userRepository;
        private IRepository<Genre> _genreRepository;
        private IMovieRepository _movieRepository;
        private IRepository<MovieRating> _ratingRepository;
        private IRepository<Comment> _commentRepository;
        private IRepository<ApplicationPermissionEntity> _permissionRepository;

        public UnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IRepository<User> UserRepository => _userRepository ??= new GenericRepository<User>(_dbContext);
        public IRepository<Genre> GenreRepository => _genreRepository ??= new GenericRepository<Genre>(_dbContext);
        public IMovieRepository MovieRepository => _movieRepository ??= new MovieRepository(_dbContext);
        public IRepository<MovieRating> RatingRepository =>
            _ratingRepository ??= new GenericRepository<MovieRating>(_dbContext);
        public IRepository<Comment> CommentRepository =>
            _commentRepository ??= new GenericRepository<Comment>(_dbContext);
        public IRepository<ApplicationPermissionEntity> PermissionRepository => _permissionRepository ??=
            new GenericRepository<ApplicationPermissionEntity>(_dbContext);

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
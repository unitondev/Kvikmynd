using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;

        private IRepository<User> _userRepository;
        private IGenreRepository _genreRepository;
        private IMovieRepository _movieRepository;
        private IRatingRepository _ratingRepository;
        private IRepository<Comment> _commentRepository;

        public UnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IRepository<User> UserRepository
        {
            get { return _userRepository ??= new GenericRepository<User>(_dbContext); }
        }

        public IGenreRepository GenreRepository
        {
            get { return _genreRepository ??= new GenreRepository(_dbContext); }
        }
        
        public IMovieRepository MovieRepository
        {
            get { return _movieRepository ??= new MovieRepository(_dbContext); }
        }
        
        public IRatingRepository RatingRepository
        {
            get { return _ratingRepository ??= new RatingRepository(_dbContext); }
        }
        
        public IRepository<Comment> CommentRepository
        {
            get { return _commentRepository ??= new GenericRepository<Comment>(_dbContext); }
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
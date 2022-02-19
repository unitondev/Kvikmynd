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
        private IRepository<Genre> _genreRepository;
        private IMovieRepository _movieRepository;
        private IRepository<MovieRating> _ratingRepository;
        private IRepository<Comment> _commentRepository;

        public UnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IRepository<User> UserRepository
        {
            get { return _userRepository ??= new GenericRepository<User>(_dbContext); }
        }

        public IRepository<Genre> GenreRepository
        {
            get { return _genreRepository ??= new GenericRepository<Genre>(_dbContext); }
        }
        
        public IMovieRepository MovieRepository
        {
            get { return _movieRepository ??= new MovieRepository(_dbContext); }
        }
        
        public IRepository<MovieRating> RatingRepository
        {
            get { return _ratingRepository ??= new GenericRepository<MovieRating>(_dbContext); }
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
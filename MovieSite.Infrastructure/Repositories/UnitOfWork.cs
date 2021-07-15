using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;

namespace MovieSite.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;
        private IUserRepository _userRepository;
        private IGenreRepository _genreRepository;
        private IMovieRepository _movieRepository;
        private IRatingRepository _ratingRepository;
        private ICommentRepository _commentRepository;
        

        public UnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IUserRepository UserRepository
        {
            get { return _userRepository ??= new UserRepository(_dbContext); }
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
        
        public ICommentRepository CommentRepository
        {
            get { return _commentRepository ??= new CommentRepository(_dbContext); }
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
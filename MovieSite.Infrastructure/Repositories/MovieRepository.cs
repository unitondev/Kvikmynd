using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class MovieRepository : RepositoryAsync<Movie>, IMovieRepository
    {
        private readonly DbContext _dbContext;

        public MovieRepository(DbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        
        public async Task<Movie> FindByTitleAsync(string title)
        {
            return await _dbContext.Set<Movie>().FirstOrDefaultAsync(movie => movie.Title == title);
        }
        
        public async Task<Movie> FindByTitleForUpdateAsync(string title)
        {
            return await _dbContext.Set<Movie>()
                .Include(movie => movie.GenreMovies)
                .FirstOrDefaultAsync(movie => movie.Title == title);
        }

        public async Task<Movie> GetMovieWithRatings(int movieId)
        {
            return await _dbContext.Set<Movie>()
                .Include(movie => movie.MovieRatings)
                .FirstOrDefaultAsync(movie => movie.Id == movieId);
        }
        
        public async Task<Movie> GetMovieWithComments(int movieId)
        {
            return await _dbContext.Set<Movie>()
                .Include(movie => movie.Comments)
                .FirstOrDefaultAsync(movie => movie.Id == movieId);
        }
    }
}
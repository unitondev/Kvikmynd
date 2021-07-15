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
    }
}
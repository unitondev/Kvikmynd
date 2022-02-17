using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        private readonly DbContext _dbContext;

        public GenreRepository(DbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Genre> FindByNameAsync(string name)
        {
            return await _dbContext.Set<Genre>().FirstOrDefaultAsync(genre => genre.Name == name);
        }
    }
}
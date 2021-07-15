using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class GenreRepository : RepositoryAsync<Genre>, IGenreRepository
    {
        public GenreRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
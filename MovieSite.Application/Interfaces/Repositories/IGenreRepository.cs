using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IGenreRepository : IRepositoryAsync<Genre>
    {
        public Task<Genre> FindByNameAsync(string name);
    }
}
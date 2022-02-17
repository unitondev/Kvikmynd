using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IGenreRepository : IRepository<Genre>
    {
        Task<Genre> FindByNameAsync(string name);
    }
}
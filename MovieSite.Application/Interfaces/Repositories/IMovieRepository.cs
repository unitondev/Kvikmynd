using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IMovieRepository : IRepositoryAsync<Movie>
    {
        public Task<Movie> FindByTitleAsync(string title);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IMovieRepository : IRepositoryAsync<Movie>
    {
        public Task<Movie> FindByTitleAsync(string title);
        public Task<Movie> FindByTitleForUpdateAsync(string title);
        Task<Movie> GetMovieWithComments(int movieId);
        Task<Movie> GetMovieWithRatings(int movieId);
    }
}
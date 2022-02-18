using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task<List<MovieCommentsResponse>> GetMovieCommentsAsync(int id);
        Task<MovieWithGenresModel> GetMovieWithGenresByIdAsync(int id);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task<List<MovieCommentsViewModel>> GetMovieCommentsAsync(int id);
        Task<MovieWithGenresModel> GetMovieWithGenresByIdAsync(int id);
    }
}
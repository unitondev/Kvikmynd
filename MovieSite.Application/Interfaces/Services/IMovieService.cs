using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(int movieId);
        Task<Result<Movie>> CreateMovieAsync(MovieRequest movieRequest);
        Task<Result<Movie>> UpdateMovieAsync(MovieRequest movieRequest);
        Task DeleteMovieByIdAsync(int movieId);
    }
}
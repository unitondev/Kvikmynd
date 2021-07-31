using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.DTO.Responses;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Repositories
{
    public interface IMovieRepository : IRepositoryAsync<Movie>
    {
        Task<bool> IsContains(int movieId); 
        Task<Movie> FindByTitleAsync(string title);
        Task<Movie> FindByTitleForUpdateAsync(string title);
        Task<IList<MovieRating>> GetMovieRating(int movieId);
        void SetMovieRatingIsModified(Movie movie);
        Task<Movie> GetMovieWithRatings(int movieId);
        Task<IReadOnlyList<MovieCommentsResponse>> GetMovieWithComments(int movieId);
        Task<MovieWithGenresResponse> GetMovieWithGenresById(int movieId);
    }
}
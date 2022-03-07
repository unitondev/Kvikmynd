using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Infrastructure.Repositories
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRepository
    {
        public MovieRepository(DbContext dbContext) : base(dbContext) {}

        public async Task<MovieWithGenresModel> GetMovieWithGenresByIdAsync(int id)
        {
            var movie = await FindByKeyAsync(id);

            var genres = await DbContext.Set<GenreMovie>()
                .Where(gm => gm.MovieId == id)
                .Select(gm => gm.Genre)
                .ToListAsync();

            return new MovieWithGenresModel()
            {
                Movie = movie,
                Genres = genres
            };;
        }

        public async Task<MoviesWithGenresAndRatingsModel> GetMovieWithGenresAndRatingsAsync(PaginationParametersModel paginationParameters)
        {
            var query = DbSet
                .Include(m => m.GenreMovies)
                .ThenInclude(gm => gm.Genre)
                .Include(m => m.MovieRatings); 
                
            var movies = await query
                .OrderBy(m => m.Id)
                .Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize)
                .Take(paginationParameters.PageSize)
                .AsNoTracking()
                .ToListAsync();

            var totalCount = await query.CountAsync();

            return new MoviesWithGenresAndRatingsModel
            {
                TotalCount = totalCount,
                Items = movies.Select(movie => new MovieWithGenresAndRatingsModel
                {
                    Movie = movie,
                    GenreMovies = movie.GenreMovies,
                    Ratings = movie.MovieRatings
                }).ToList()
            };
        }

        public async Task<List<MovieCommentsViewModel>> GetMovieCommentsAsync(int id)
        {
            return await DbContext.Set<Comment>()
                .AsNoTracking()
                .Where(c => c.MovieId == id)
                .Select(c => new MovieCommentsViewModel
                {
                    CommentId = c.Id,
                    CommentText = c.Text,
                    UserName = c.User.UserName,
                    UserAvatar = Encoding.UTF8.GetString(c.User.Avatar)
                })
                .ToListAsync();
        }
    }
}
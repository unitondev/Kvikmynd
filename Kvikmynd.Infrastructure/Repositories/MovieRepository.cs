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

        public async Task<TotalCountViewModel<MovieWithGenresAndRatingsModel>> GetMoviesWithGenresAndRatingsAsync(SearchQueryModel model)
        {
            var query = DbSet.AsQueryable();

            if (!string.IsNullOrEmpty(model.SearchQuery))
            {
                query = query
                    .Where(i => i.Title.Contains(model.SearchQuery))
                    .Include(m => m.MovieRatings);
            }
            else
            {
                query = query
                    .Include(m => m.MovieRatings)
                    .Include(m => m.GenreMovies)
                    .ThenInclude(gm => gm.Genre);
            }

            var movies = await query
                .OrderBy(m => m.Id)
                .Skip((int) (model.PageSize.HasValue && model.PageNumber.HasValue 
                        ? ((model.PageNumber - 1) * model.PageSize) 
                        : 0)
                )
                .Take(model.PageSize ?? int.MaxValue)
                .AsNoTracking()
                .ToListAsync();

            var totalCount = await query.CountAsync();

            return new TotalCountViewModel<MovieWithGenresAndRatingsModel>
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
                    UserAvatar = c.User.AvatarUrl
                })
                .ToListAsync();
        }
    }
}
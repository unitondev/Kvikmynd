using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Infrastructure.Shared.Repositories
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

        public async Task<TotalCountViewModel<MovieWithGenresAndRatingsModel>> GetMoviesWithGenresAndRatingsAsync(SearchQueryModel model, CancellationToken cancellationToken)
        {
            var query = DbSet.AsQueryable();

            if (!string.IsNullOrEmpty(model.SearchQuery))
            {
                query = query.Where(i => i.Title.Contains(model.SearchQuery));
            }
            else
            {
                query = query
                    .Include(m => m.GenreMovies)
                    .ThenInclude(gm => gm.Genre);
            }

            if (model.UserId.HasValue)
            {
                query = query.Include(m => m.BookmarkMovies.Where(bm => bm.UserId == model.UserId));
            }

            query = model.AreDeletedMovies ? query.Where(m => m.IsDeleted) : query.Where(m => !m.IsDeleted);

            var movies = await query
                .Include(m => m.MovieRatings)
                .OrderBy(m => m.Id)
                .Skip((int) (model.PageSize.HasValue && model.PageNumber.HasValue 
                        ? ((model.PageNumber - 1) * model.PageSize) 
                        : 0)
                )
                .Take(model.PageSize ?? int.MaxValue)
                .AsNoTracking()
                .ToListAsync(cancellationToken: cancellationToken);

            var totalCount = await query.CountAsync(cancellationToken: cancellationToken);
            
            return new TotalCountViewModel<MovieWithGenresAndRatingsModel>
            {
                TotalCount = totalCount,
                Items = movies.Select(movie => new MovieWithGenresAndRatingsModel
                {
                    Movie = movie,
                    GenreMovies = movie.GenreMovies,
                    Ratings = movie.MovieRatings,
                    IsBookmark = movie.BookmarkMovies?.Count > 0,
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
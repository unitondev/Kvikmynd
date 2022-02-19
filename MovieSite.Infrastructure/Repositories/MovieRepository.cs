using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
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
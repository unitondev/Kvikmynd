using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure.Repositories
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRepository
    {
        public MovieRepository(DbContext dbContext) : base(dbContext) { }

        public async Task<MovieWithGenresResponse> GetMovieWithGenresByIdAsync(int movieId)
        {
            var movie = await FindAsync(m => m.Id == movieId);
            var genres = await DbContext.Set<Genre>().AsNoTracking().ToListAsync();
            
            var genreMovies = await All()
                .Where(m => m.Id == movieId)
                .Include(m => m.GenreMovies)
                .Select(m => m.GenreMovies)
                .FirstOrDefaultAsync();

            var movieWithGenresResponse = new MovieWithGenresResponse()
            {
                Movie = movie,
                GenreNames = new List<string>()
            };

            var genreNames = genreMovies
                .Join(genres, genreMovie => genreMovie.GenreId, genre => genre.Id,
                    (genreMovie, genre) => new
                    {
                        GenreName = genre.Name
                    });

            foreach (var genreName in genreNames)
            {
                movieWithGenresResponse.GenreNames.Add(genreName.GenreName);
            }

            return movieWithGenresResponse;
        }
        
        public async Task<Movie> FindByTitleAsync(string title)
        {
            return await DbSet.FirstOrDefaultAsync(movie => movie.Title == title);
        }
        
        public async Task<Movie> FindByTitleForUpdateAsync(string title)
        {
            return await DbSet
                .Include(movie => movie.GenreMovies)
                .FirstOrDefaultAsync(movie => movie.Title == title);
        }

        public async Task<Movie> GetMovieWithRatings(int movieId)
        {
            return await DbSet
                .Include(movie => movie.MovieRatings)
                .FirstOrDefaultAsync(movie => movie.Id == movieId);
        }
        
        public async Task<IList<MovieRating>> GetMovieRating(int movieId)
        {
            return await DbSet
                .Where(movie => movie.Id == movieId)
                .Select(movie => movie.MovieRatings)
                .AsNoTracking()
                .FirstOrDefaultAsync();
        }

        public void SetMovieRatingIsModified(Movie movie)
        {
            DbContext.Entry(movie).Property(movie1 => movie1.Rating).IsModified = true;
        }
        
        public async Task<IReadOnlyList<MovieCommentsResponse>> GetMovieWithCommentsAsync(int movieId)
        {
            var movieCommentsResponse = from movie in DbSet
                where movie.Id == movieId
                join comments in DbContext.Set<Comment>() on movie.Id equals comments.MovieId
                join user in DbContext.Set<User>() on comments.UserId equals user.Id
                select new MovieCommentsResponse
                {
                    CommentId = comments.Id, 
                    CommentText =comments.Text,
                    UserName = user.UserName, 
                    UserAvatar = Encoding.UTF8.GetString(user.Avatar)
                };

            return (await movieCommentsResponse.ToListAsync()).AsReadOnly();
        }
    }
}
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieSite.Domain.Models;
using MovieSite.Infrastructure.Covers;

namespace MovieSite.Infrastructure
{
    public class MovieSiteDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public MovieSiteDbContext()
        { }
        
        public MovieSiteDbContext(DbContextOptions<MovieSiteDbContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.LogTo(System.Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region DataSeeding
            
            string[] genresArray = new []
            {
                "anime", "biography", "western", "military", "detective", "child", "for adults", "documentary", "drama", "the game",
                "history", "comedy", "concert", "short film", "crime", "melodrama", "music", "cartoon", "musical", "news", 
                "adventures", "real tv", "family", "sport", "talk show", "thriller", "horrors", "fantastic", "film noir", "fantasy",
                "action"
            };
            
            for (int i = 0; i < genresArray.Length; i++)
            {
                modelBuilder.Entity<Genre>().HasData(
                    new Genre()
                    {
                        Id = i + 1,
                        Name = genresArray[i]
                    }
                );
            }
            
            modelBuilder.Entity<Movie>().HasData(
                new Movie()
                {
                    Id = 1,
                    Title = "Fight Club",
                    Description = "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
                    Cover = Encoding.UTF8.GetBytes("data:image/jpeg;base64," + Base64Coder.EncodeImageToString(@"../MovieSite.Infrastructure/Covers/fightClub.jpg")),
                    YoutubeLink = "SUXWAEX2jlg",
                    Rating = 0,
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 2,
                    Title = "American Psycho",
                    Description = "A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.",
                    Cover = Encoding.UTF8.GetBytes("data:image/jpeg;base64," + Base64Coder.EncodeImageToString(@"../MovieSite.Infrastructure/Covers/americanPsycho.jpg")),
                    YoutubeLink = "5YnGhW4UEhc",
                    Rating = 0,
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 3,
                    Title = "Pulp Fiction",
                    Description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                    Cover = Encoding.UTF8.GetBytes("data:image/jpeg;base64," + Base64Coder.EncodeImageToString(@"../MovieSite.Infrastructure/Covers/PulpFiction.jpg")),
                    YoutubeLink = "s7EdQ4FqbhY",
                    Rating = 0,
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 4,
                    Title = "Memento",
                    Description = "A man with short-term memory loss attempts to track down his wife's murderer.",
                    Cover = Encoding.UTF8.GetBytes("data:image/jpeg;base64," + Base64Coder.EncodeImageToString(@"../MovieSite.Infrastructure/Covers/memento.jpg")),
                    YoutubeLink = "HDWylEQSwFo",
                    Rating = 0,
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 5,
                    Title = "2001: A Space Odyssey",
                    Description = "After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer H.A.L. 9000.",
                    Cover = Encoding.UTF8.GetBytes("data:image/jpeg;base64," + Base64Coder.EncodeImageToString(@"../MovieSite.Infrastructure/Covers/2001.jpg")),
                    YoutubeLink = "oR_e9y-bka0",
                    Rating = 0,
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                },
                new Movie()
                {
                    Id = 6,
                    Title = "No Country for Old Men",
                    Description = "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
                    Cover = Encoding.UTF8.GetBytes("data:image/jpeg;base64," + Base64Coder.EncodeImageToString(@"../MovieSite.Infrastructure/Covers/NoCountryForOldMen.jpg")),
                    YoutubeLink = "38A__WT3-o0",
                    Rating = 0,
                    GenreMovies = new List<GenreMovie>(),
                    MovieRatings = new List<MovieRating>(),
                    Comments = new List<Comment>()
                }
            );

            modelBuilder.Entity<GenreMovie>().HasData(
                new GenreMovie()
                {
                    MovieId = 1,
                    GenreId = 9
                },
                new GenreMovie()
                {
                    MovieId = 1,
                    GenreId = 26
                },
                new GenreMovie()
                {
                    MovieId = 2,
                    GenreId = 9
                },
                new GenreMovie()
                {
                    MovieId = 2,
                    GenreId = 15
                },
                new GenreMovie()
                {
                    MovieId = 2,
                    GenreId = 26
                },
                new GenreMovie()
                {
                    MovieId = 3,
                    GenreId = 9
                },
                new GenreMovie()
                {
                    MovieId = 3,
                    GenreId = 15
                },
                new GenreMovie()
                {
                    MovieId = 4,
                    GenreId = 5
                },
                new GenreMovie()
                {
                    MovieId = 4,
                    GenreId = 9
                },
                new GenreMovie()
                {
                    MovieId = 4,
                    GenreId = 15
                },
                new GenreMovie()
                {
                    MovieId = 4,
                    GenreId = 26
                },
                new GenreMovie()
                {
                    MovieId = 5,
                    GenreId = 21
                },
                new GenreMovie()
                {
                    MovieId = 5,
                    GenreId = 28
                },
                new GenreMovie()
                {
                    MovieId = 6,
                    GenreId = 9
                },
                new GenreMovie()
                {
                    MovieId = 6,
                    GenreId = 15
                },
                new GenreMovie()
                {
                    MovieId = 6,
                    GenreId = 26
                }
            );

            #endregion
            
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<GenreMovie>().HasKey(gm => new {gm.GenreId, gm.MovieId});
            modelBuilder.Entity<MovieRating>().HasKey(mr => new {mr.MovieId, mr.UserId});
            modelBuilder.Entity<Comment>().HasOne<User>(comment => comment.User).WithMany(user => user.Comments)
                .HasForeignKey(comment => comment.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Comment>().HasOne<Movie>(comment => comment.Movie).WithMany(movie => movie.Comments)
                .HasForeignKey(comment => comment.MovieId).OnDelete(DeleteBehavior.Cascade);
        }
        
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
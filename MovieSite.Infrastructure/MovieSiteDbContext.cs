using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieSite.Domain.Models;

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
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<GenreMovie>().HasKey(gm => new {gm.GenreId, gm.MovieId});
            modelBuilder.Entity<MovieRating>().HasKey(mr => new {mr.MovieId, mr.RatingId});
            modelBuilder.Entity<UserRating>().HasKey(ur => new {ur.UserId, ur.RatingId});
            modelBuilder.Entity<Comment>().HasOne<User>(comment => comment.User).WithMany(user => user.Comments)
                .HasForeignKey(comment => comment.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Comment>().HasOne<Movie>(comment => comment.Movie).WithMany(movie => movie.Comments)
                .HasForeignKey(comment => comment.MovieId).OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
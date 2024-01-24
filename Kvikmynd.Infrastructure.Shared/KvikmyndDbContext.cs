using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Infrastructure.Shared
{
    public class KvikmyndDbContext : IdentityDbContext<User, ApplicationRole, int>
    {
        public KvikmyndDbContext()
        { }
        
        public KvikmyndDbContext(DbContextOptions<KvikmyndDbContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.LogTo(System.Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<GenreMovie>().HasKey(gm => new {gm.GenreId, gm.MovieId});
            modelBuilder.Entity<MovieRating>().HasKey(mr => new {mr.MovieId, mr.UserId});
            modelBuilder.Entity<Comment>().HasOne<User>(comment => comment.User).WithMany(user => user.Comments)
                .HasForeignKey(comment => comment.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Comment>().HasOne<Movie>(comment => comment.Movie).WithMany(movie => movie.Comments)
                .HasForeignKey(comment => comment.MovieId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BookmarkMovie>()
                .HasKey(b => new {b.MovieId, b.UserId});
        }
        
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<BookmarkMovie> BookmarkMovies { get; set; }
        public DbSet<ApplicationPermissionEntity> Permissions { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
    }
}
using Microsoft.EntityFrameworkCore;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure
{
    public class MovieSiteDbContext : DbContext
    {
        public MovieSiteDbContext()
        { }
        
        public MovieSiteDbContext(DbContextOptions<MovieSiteDbContext> options)
            : base(options)
        { }
        
        public DbSet<User> Users { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
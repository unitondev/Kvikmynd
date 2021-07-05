using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieSite.Domain.Models;

namespace MovieSite.Infrastructure
{
    public class MovieSiteDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
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
        }
    }
}
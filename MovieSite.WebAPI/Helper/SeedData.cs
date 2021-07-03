using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MovieSite.Domain.Models;
using MovieSite.Infrastructure;

namespace MovieSite
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var dbContext = new MovieSiteDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<MovieSiteDbContext>>());
            
            dbContext.Users.AddRange(
                new User
                {
                    Email = "12312@gmail.com", FullName = "11111111111", PasswordHash = "sad987ytfcv"
                },
                new User
                {
                    Email = "kjhgvb@gmail.com", FullName = "222222222", PasswordHash = "kiuytresxct6g78"
                });
            dbContext.SaveChanges();
        }
    }
}
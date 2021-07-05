using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using MovieSite.Domain.Models;

namespace MovieSite.Helper
{
    public class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetService<UserManager<User>>();

            var user = new User
            {
                Email = "12312@gmail.com", FullName = "11111111111", UserName = "first"
            };

            // var result = userManager.CreateAsync(user, "123456").GetAwaiter().GetResult();
            var result = await userManager.CreateAsync(user, "123456");
            
            if (!result.Succeeded)
                throw new Exception("Can't seed user!");
        }
    }
}
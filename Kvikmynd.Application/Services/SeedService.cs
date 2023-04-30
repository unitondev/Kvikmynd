using System;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Kvikmynd.Application.Services
{
    public class SeedService
    {
        private readonly IUnitOfWork _work;
        private readonly UserManager<User> _userManager;
        private readonly IFileUploadService _fileUploadService;

        public SeedService(IUnitOfWork work, UserManager<User> userManager, IFileUploadService fileUploadService)
        {
            _work = work;
            _userManager = userManager;
            _fileUploadService = fileUploadService;
        }

        public async Task<ServiceResult> SeedAdmin()
        {
            var defaultPassword = "Testest123!";
            var user = await _userManager.FindByEmailAsync("admin@admin.com");
            if (user == null)
            {
                var admin = new User
                {
                    FullName = "Admin",
                    UserName = "Admin",
                    Email = "admin@admin.com",
                    EmailConfirmed = true,
                };

                var result = await _userManager.CreateAsync(admin, defaultPassword);
                if (!result.Succeeded) return new ServiceResult(ErrorCode.UserNotCreated);

                var roleResult = await _userManager.AddToRoleAsync(admin, Role.SystemAdmin.ToString());
                if (!roleResult.Succeeded) return new ServiceResult(ErrorCode.UserNotCreated);
            }

            return new ServiceResult();
        }
        
        public async Task SeedMoviesCoversAsync()
        {
            var coversPaths = new[]
            {
                @"../Kvikmynd.Infrastructure/Covers/fightClub.jpg",
                @"../Kvikmynd.Infrastructure/Covers/americanPsycho.jpg",
                @"../Kvikmynd.Infrastructure/Covers/PulpFiction.jpg",
                @"../Kvikmynd.Infrastructure/Covers/memento.jpg",
                @"../Kvikmynd.Infrastructure/Covers/2001.jpg",
                @"../Kvikmynd.Infrastructure/Covers/NoCountryForOldMen.jpg",
                @"../Kvikmynd.Infrastructure/Covers/28DaysLater.jpg",
                @"../Kvikmynd.Infrastructure/Covers/TheGirlWithTheDragonTattoo.jpg",
                @"../Kvikmynd.Infrastructure/Covers/Dunkirk.jpg",
                @"../Kvikmynd.Infrastructure/Covers/Thursday.jpg",
                @"../Kvikmynd.Infrastructure/Covers/Scarface.jpg",
                @"../Kvikmynd.Infrastructure/Covers/TheMatrix.jpg",
                @"../Kvikmynd.Infrastructure/Covers/CatchMeIfYouCan.jpg",
                @"../Kvikmynd.Infrastructure/Covers/Se7en.jpg",
                @"../Kvikmynd.Infrastructure/Covers/TheShining.jpg",
                @"../Kvikmynd.Infrastructure/Covers/12AngryMen.jpg",
                @"../Kvikmynd.Infrastructure/Covers/AmericanHistoryX.jpg",
                @"../Kvikmynd.Infrastructure/Covers/OneFlewOvertheCuckoosNest.jpg",
                @"../Kvikmynd.Infrastructure/Covers/LockStockandTwoSmokingBarrels.jpg",
                @"../Kvikmynd.Infrastructure/Covers/WhoAmI.jpg",
                @"../Kvikmynd.Infrastructure/Covers/ThereWillBeBlood.jpg",
                @"../Kvikmynd.Infrastructure/Covers/TaxiDriver.jpg",
                @"../Kvikmynd.Infrastructure/Covers/TheThing.jpg"
            };

            for (var i = 0; i < coversPaths.Length; i++)
            {
                var movie = await _work.MovieRepository.FindByKeyAsync(i + 1);
                if (movie.CoverUrl is null)
                {
                    var coverInBytes = await System.IO.File.ReadAllBytesAsync(coversPaths[i]);
                    movie.CoverUrl = await _fileUploadService.UploadImageToFirebaseAsync(Convert.ToBase64String(coverInBytes), "covers");
                }
            }
            
            await _work.CommitAsync();
        }
    }
}
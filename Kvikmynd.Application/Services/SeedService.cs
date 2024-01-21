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
                @"../Kvikmynd.Infrastructure.Shared/Covers/fightClub.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/americanPsycho.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/PulpFiction.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/memento.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/2001.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/NoCountryForOldMen.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/28DaysLater.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/TheGirlWithTheDragonTattoo.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/Dunkirk.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/Thursday.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/Scarface.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/TheMatrix.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/CatchMeIfYouCan.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/Se7en.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/TheShining.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/12AngryMen.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/AmericanHistoryX.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/OneFlewOvertheCuckoosNest.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/LockStockandTwoSmokingBarrels.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/WhoAmI.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/ThereWillBeBlood.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/TaxiDriver.jpg",
                @"../Kvikmynd.Infrastructure.Shared/Covers/TheThing.jpg"
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
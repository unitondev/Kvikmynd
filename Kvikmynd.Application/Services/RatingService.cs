using System;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Services
{
    public class RatingService : GenericService<MovieRating>, IRatingService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _work;

        public RatingService(IUnitOfWork work) : base(work.RatingRepository, work)
        {
            _work = work;
        }

        public async Task<ServiceResult<MovieRating>> GetByUserAndMovieIdAsync(int userId, int movieId)
        {
            var rating = await _work.RatingRepository.FindAsync(r => r.MovieId == movieId && r.UserId == userId);
            if (rating == null)
            {
                return new ServiceResult<MovieRating>(ErrorCode.UserRatingNotFound);
            }

            return new ServiceResult<MovieRating>(rating);
        }

        public void Dispose()
        {
            _work.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _work.DisposeAsync();
        }
    }
}
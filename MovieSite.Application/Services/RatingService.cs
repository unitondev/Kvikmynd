using System;
using System.Threading.Tasks;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Common.Services;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class RatingService : GenericService<MovieRating>, IRatingService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;

        public RatingService(IUnitOfWork unitOfWork) : base(unitOfWork.RatingRepository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ServiceResult<MovieRating>> GetByUserAndMovieIdAsync(int userId, int movieId)
        {
            var rating = await _unitOfWork.RatingRepository.GetByUserAndMovieIdAsync(userId, movieId);
            if (rating == null)
            {
                return new ServiceResult<MovieRating>(ErrorCode.UserRatingNotFound);
            }

            return new ServiceResult<MovieRating>(rating);
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _unitOfWork.DisposeAsync();
        }
    }
}
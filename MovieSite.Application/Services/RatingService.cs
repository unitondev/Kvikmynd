using System;
using System.Threading.Tasks;
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

        public async Task<MovieRating> GetByUserAndMovieIdAsync(int userId, int movieId)
        {
            var rating = await _unitOfWork.RatingRepository.GetByUserAndMovieIdAsync(userId, movieId);
            if (rating == null)
            {
                // TODO fix this mistake
                return new MovieRating
                {
                    MovieId = movieId,
                    UserId = userId,
                    Value = 0
                };
            }

            return rating;
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
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class RatingService : IRatingService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RatingService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<Rating>> GetRatingsAsync()
        {
            return await _unitOfWork.RatingRepository.GetAllAsync();
        }

        public async Task<Rating> GetRatingByIdAsync(int ratingId)
        {
            return await _unitOfWork.RatingRepository.GetByIdOrDefaultAsync(ratingId);
        }

        public async Task<Rating> CreateRatingAsync(Rating rating)
        {
            await _unitOfWork.RatingRepository.AddAsync(rating);
            await _unitOfWork.CommitAsync();
            return rating;
        }

        public async Task<Rating> UpdateRatingAsync(Rating rating)
        {
            await _unitOfWork.RatingRepository.UpdateAsync(rating);
            await _unitOfWork.CommitAsync();
            return rating;
        }

        public async Task<bool> DeleteRatingByIdAsync(int ratingId)
        {
            await _unitOfWork.RatingRepository.DeleteByIdAsync(ratingId);
            await _unitOfWork.CommitAsync();
            return true;
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
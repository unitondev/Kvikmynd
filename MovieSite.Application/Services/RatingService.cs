using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
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
        
        public async Task<IEnumerable<MovieRating>> GetRatingsAsync()
        {
            return await _unitOfWork.RatingRepository.GetAllAsync();
        }

        public async Task<Result<int>> GetRatingByUserAndMovieIdAsync(RatingRequest ratingRequest)
        {
            var rating = await _unitOfWork.RatingRepository.GetRatingByUserAndMovieIdAsync(ratingRequest.UserId, ratingRequest.MovieId);
            if (rating == null) return Result<int>.Success(0);
            
            return Result<int>.Success(rating.Value);
        }
        
        public async Task<Result<int>> CreateRatingAsync(CreateRatingRequest ratingRequest)
        {
            var movieRating = _mapper.Map<CreateRatingRequest, MovieRating>(ratingRequest);

            await _unitOfWork.RatingRepository.AddAsync(movieRating);
            await _unitOfWork.CommitAsync();
            
            return Result<int>.Success(movieRating.Value);
        }
        
        public async Task DeleteRatingByUserAndMovieIdAsync(RatingRequest ratingRequest)
        {
            await _unitOfWork.RatingRepository.DeleteRatingByUserAndMovieIdAsync(ratingRequest.UserId, ratingRequest.MovieId);
            await _unitOfWork.CommitAsync();
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
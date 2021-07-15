using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class MovieService : IMovieService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MovieService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<Movie>> GetAllMoviesAsync()
        {
            return await _unitOfWork.MovieRepository.GetAllAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(int movieId)
        {
            return await _unitOfWork.MovieRepository.GetByIdOrDefaultAsync(movieId);
        }

        public async Task<Movie> CreateMovieAsync(Movie movie)
        {
            await _unitOfWork.MovieRepository.AddAsync(movie);
            await _unitOfWork.CommitAsync();
            return movie;
        }

        public async Task<Movie> UpdateMovieAsync(Movie movie)
        {
            await _unitOfWork.MovieRepository.UpdateAsync(movie);
            await _unitOfWork.CommitAsync();
            return movie;
        }

        public async Task<bool> DeleteMovieByIdAsync(int movieId)
        {
            await _unitOfWork.MovieRepository.DeleteByIdAsync(movieId);
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
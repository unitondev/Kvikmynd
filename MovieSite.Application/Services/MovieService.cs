using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;
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
        
        public async Task<Result<Movie>> CreateMovieAsync(MovieRequest movieRequest)
        {
            var createdMovie = await _unitOfWork.MovieRepository.FindByTitleAsync(movieRequest.Title);
            if (createdMovie != null)
                return Result<Movie>.BadRequest(Error.MovieAlreadyExists);
            
            createdMovie = _mapper.Map<MovieRequest, Movie>(movieRequest);
            await _unitOfWork.MovieRepository.AddAsync(createdMovie);
            await _unitOfWork.CommitAsync();
            return Result<Movie>.Success(createdMovie);
        }
        
        public async Task<Result<Movie>> UpdateMovieAsync(MovieRequest movieRequest)
        {
            var updatedMovie = await _unitOfWork.MovieRepository.FindByTitleAsync(movieRequest.Title);
            if(updatedMovie == null)
                return Result<Movie>.NotFound();

            updatedMovie = _mapper.Map<MovieRequest, Movie>(movieRequest);
            await _unitOfWork.MovieRepository.UpdateAsync(updatedMovie);
            await _unitOfWork.CommitAsync();
            return Result<Movie>.Success(updatedMovie);
        }

        public async Task DeleteMovieByIdAsync(int movieId)
        {
            await _unitOfWork.MovieRepository.DeleteByIdAsync(movieId);
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
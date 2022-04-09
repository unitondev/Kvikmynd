using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Application.Services
{
    public class MovieService : GenericService<Movie>, IMovieService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _work;
        private readonly IMapper _mapper;

        public MovieService(IUnitOfWork work, IMapper mapper) : base(work.MovieRepository, work)
        {
            _work = work;
            _mapper = mapper;
        }
        
        public async Task<TotalCountViewModel<MovieWithGenresAndRatingsViewModel>> GetAllMoviesAsync(SearchQueryModel model, CancellationToken cancellationToken)
        {
            var movies = await _work.MovieRepository.GetMoviesWithGenresAndRatingsAsync(model, cancellationToken);

            var moviesViewModels = _mapper.Map<List<MovieWithGenresAndRatingsModel>, 
                List<MovieWithGenresAndRatingsViewModel>>(movies.Items);

            return new TotalCountViewModel<MovieWithGenresAndRatingsViewModel>()
            {
                Items = moviesViewModels,
                TotalCount = movies.TotalCount
            };
        }
        
        public async Task<MovieWithGenresViewModel> GetMovieWithGenresByIdAsync(int id)
        {
            var entityModel = await _work.MovieRepository.GetMovieWithGenresByIdAsync(id);
            
            return _mapper.Map<MovieWithGenresModel, MovieWithGenresViewModel>(entityModel);
        }

        public async Task<ServiceResult<List<MovieCommentsViewModel>>> GetMovieComments(int id)
        {
            if (!await ExistsAsync(id))
            {
                return new ServiceResult<List<MovieCommentsViewModel>>(ErrorCode.MovieNotFound);
            }

            var movieComments = await _work.MovieRepository.GetMovieCommentsAsync(id);
            
            return new ServiceResult<List<MovieCommentsViewModel>>(movieComments);
        }

        public async Task<TotalCountViewModel<MovieWithRatingsModel>> GetMoviesWithRatingByUserIdAsync(GetMoviesRatingsModel model)
        {
            var query = _work.RatingRepository
                .All()
                .Include(mr => mr.Movie)
                    .ThenInclude(m => m.BookmarkMovies.Where(bm => bm.UserId == model.UserId))
                .Where(mr => mr.UserId == model.UserId);
            
            var movieRating = await query
                .OrderByDescending(mr => mr.Value)
                .Skip((int) (model.PageSize.HasValue && model.PageNumber.HasValue 
                        ? ((model.PageNumber - 1) * model.PageSize) 
                        : 0)
                )
                .Take(model.PageSize ?? int.MaxValue)
                .ToListAsync();
            
            var totalCount = await query.CountAsync();

            return new TotalCountViewModel<MovieWithRatingsModel>
            {
                TotalCount = totalCount,
                Items = movieRating.Select(rating => new MovieWithRatingsModel
                {
                    Movie = rating.Movie,
                    MovieRating = rating,
                    IsBookmark = rating.Movie.BookmarkMovies?.Count > 0, 
                }).ToList()
            };
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
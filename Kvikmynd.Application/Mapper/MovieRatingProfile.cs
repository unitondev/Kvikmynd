using AutoMapper;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper
{
    public class MovieRatingProfile : Profile
    {
        public MovieRatingProfile()
        {
            CreateMap<MovieRating, MovieRatingViewModel>();

            CreateMap<MovieRatingViewModel, MovieRating>();
        }
    }
}
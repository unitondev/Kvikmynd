using AutoMapper;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
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
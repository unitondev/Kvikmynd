using AutoMapper;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;
using MovieSite.ViewModels;

namespace MovieSite.Application.Mapper
{
    public class DTOsToViewModelsProfile : Profile
    {
        public DTOsToViewModelsProfile()
        {
            CreateMap<MovieWithGenresModel, MovieWithGenresViewModel>()
                .ForMember(dest => dest.Movie, opt =>
                    opt.MapFrom(src => src.Movie))
                .ForMember(dest => dest.GenreNames, opt =>
                    opt.MapFrom(src => src.Genres));

            CreateMap<Genre, GenreViewModel>();
        }
    }
}
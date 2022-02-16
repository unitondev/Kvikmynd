using AutoMapper;
using MovieSite.Application.ViewModels;
using MovieSite.ViewModels;

namespace MovieSite.Application.Mapper
{
    public class DTOsToViewModelsProfile : Profile
    {
        public DTOsToViewModelsProfile()
        {
            CreateMap<MovieWithGenresResponse, MovieWithGenresViewModel>()
                .ForMember(dest => dest.Movie, opt =>
                    opt.MapFrom(src => src.Movie));
        }
    }
}
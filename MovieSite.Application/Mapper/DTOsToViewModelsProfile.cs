using System.Linq;
using AutoMapper;
using MovieSite.Application.DTO.Responses;
using MovieSite.Domain.Models;
using MovieSite.ViewModels;

namespace MovieSite.Application.Mapper
{
    public class DTOsToViewModelsProfile : Profile
    {
        public DTOsToViewModelsProfile()
        {
            CreateMap<Movie, MovieWithGenresViewModel>()
                .ForMember(_ => _.Genres, 
                    expression => expression.MapFrom(
                        source => source.GenreMovies.Select(_ => _.Genre.Name).ToList().AsReadOnly()));
        }
    }
}
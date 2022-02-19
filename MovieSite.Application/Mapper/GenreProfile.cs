using AutoMapper;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class GenreProfile : Profile
    {
        public GenreProfile()
        {
            CreateMap<Genre, GenreViewModel>();
        }
    }
}
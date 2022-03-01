using AutoMapper;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper
{
    public class GenreProfile : Profile
    {
        public GenreProfile()
        {
            CreateMap<Genre, GenreViewModel>();

            CreateMap<GenreMovie, GenreViewModel>().IncludeMembers(src => src.Genre);
        }
    }
}
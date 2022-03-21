using AutoMapper;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper
{
    public class GenreProfile : Profile
    {
        public GenreProfile()
        {
            CreateMap<Genre, GenreModel>();
            CreateMap<GenreModel, Genre>();

            CreateMap<GenreMovie, GenreModel>().IncludeMembers(src => src.Genre);
        }
    }
}
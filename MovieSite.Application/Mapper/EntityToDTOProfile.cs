using AutoMapper;
using MovieSite.Application.DTO;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class EntityToDTOProfile : Profile
    {
        public EntityToDTOProfile()
        {
            CreateMap<User, EditUserResponse>();
        }
    }
}
using System.Text;
using AutoMapper;
using MovieSite.Application.DTO.Responses;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class EntityToDTOProfile : Profile
    {
        public EntityToDTOProfile()
        {
            CreateMap<User, EditUserResponse>()
                .ForMember(dest => dest.Avatar, opt => 
                    opt.MapFrom(src => Encoding.UTF8.GetString(src.Avatar)));
        }
    }
}
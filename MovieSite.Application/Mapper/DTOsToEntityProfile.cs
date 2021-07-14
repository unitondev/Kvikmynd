using System.Collections.Generic;
using AutoMapper;
using MovieSite.Application.DTO.Requests;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class DTOsToEntityProfile : Profile
    {
        public DTOsToEntityProfile()
        {
            CreateMap<UserRegisterRequest, User>()
                .ForMember(dest => dest.Avatar, opt => 
                    opt.Condition(src => (src.Avatar != null)))
                .AfterMap((src, dest) => dest.RefreshTokens = new List<RefreshToken>());


            CreateMap<EditUserRequest, User>();
            // .ForMember(dest => dest.Avatar, opt => 
            // opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Avatar)));

        }
    }
}
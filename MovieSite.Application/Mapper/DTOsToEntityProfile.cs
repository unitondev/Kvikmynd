using AutoMapper;
using MovieSite.Application.DTO.Requests;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class DTOsToEntityProfile : Profile
    {
        public DTOsToEntityProfile()
        {
            CreateMap<UserRegisterRequest, User>();
        }
    }
}
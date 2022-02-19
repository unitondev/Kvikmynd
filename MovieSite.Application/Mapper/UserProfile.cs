using System.Collections.Generic;
using System.Text;
using AutoMapper;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRegistrationModel, User>()
                .ForMember(dest => dest.Avatar, opt =>
                {
                    opt.PreCondition(src => src.Avatar != null);
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Avatar));
                })
                .AfterMap((src, dest) => 
                    dest.RefreshTokens = new List<RefreshToken>());
            
            CreateMap<UpdateUserModel, User>()
                .ForMember(dest => dest.Avatar, opt => 
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Avatar)));
            
            CreateMap<User, UpdatedUserViewModel>()
                .ForMember(dest => dest.Avatar, opt => 
                    opt.MapFrom(src => Encoding.UTF8.GetString(src.Avatar)));
            
            CreateMap<User, UserViewModel>();
        }
    }
}
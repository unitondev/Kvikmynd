using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper
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
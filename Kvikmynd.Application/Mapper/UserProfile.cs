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
                .AfterMap((src, dest) => 
                    dest.RefreshTokens = new List<RefreshToken>());

            CreateMap<UpdateUserModel, User>();

            CreateMap<User, UpdatedUserViewModel>();

            CreateMap<User, UserViewModel>();
        }
    }
}
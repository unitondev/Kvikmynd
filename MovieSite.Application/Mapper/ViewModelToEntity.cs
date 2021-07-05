using AutoMapper;
using MovieSite.Application.ViewModel;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class ViewModelToEntity : Profile
    {
        public ViewModelToEntity()
        {
            CreateMap<UserRegisterViewModel, User>();
        }
    }
}
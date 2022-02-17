using System.Text;
using AutoMapper;
using MovieSite.Application.ViewModels;
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

            CreateMap<Movie, MovieResponse>()
                .ForMember(dest => dest.Cover, opt =>
                    opt.MapFrom(src => Encoding.UTF8.GetString(src.Cover)));

            CreateMap<Comment, CommentResponse>()
                .ForMember(dest => dest.User, opt =>
                    opt.MapFrom(src => src.User));
            
            CreateMap<MovieRating, MovieRatingViewModel>();
        }
    }
}
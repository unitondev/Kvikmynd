using System.Collections.Generic;
using System.Text;
using AutoMapper;
using MovieSite.Application.Models;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class DTOsToEntityProfile : Profile
    {
        public DTOsToEntityProfile()
        {
            CreateMap<UserRegistrationModel, User>()
                .ForMember(dest => dest.Avatar, opt =>
                {
                    opt.PreCondition(src => src.Avatar != null);
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Avatar));
                })
                .AfterMap((src, dest) => 
                    dest.RefreshTokens = new List<RefreshToken>());


            CreateMap<EditUserRequest, User>()
                .ForMember(dest => dest.Avatar, opt => 
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Avatar)));

            CreateMap<MovieRequest, Movie>()
                .ForMember(dest => dest.Cover, opt => 
                {
                    opt.PreCondition(src => src.Cover != null);
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Cover));
                })
                .AfterMap((src, dest) =>
                {
                    dest.GenreMovies ??= new List<GenreMovie>();
                    dest.MovieRatings ??= new List<MovieRating>();
                    dest.Comments ??= new List<Comment>();
                });

            CreateMap<EditMovieRequest, Movie>()
                .ForMember(dest => dest.Cover, opt =>
                {
                    opt.PreCondition(src => src.Cover != null);
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Cover));
                })
                .AfterMap((src, dest) =>
                    dest.GenreMovies = new List<GenreMovie>());

            CreateMap<CommentRequest, Comment>();

            CreateMap<CreateRatingRequest, MovieRating>();
        }
    }
}
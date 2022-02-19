using System.Collections.Generic;
using System.Text;
using AutoMapper;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;
using MovieSite.Domain.Models;
using MovieSite.ViewModels;

namespace MovieSite.Application.Mapper
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<MovieModel, Movie>()
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

            CreateMap<EditMovieModel, Movie>()
                .ForMember(dest => dest.Cover, opt =>
                {
                    opt.PreCondition(src => src.Cover != null);
                    opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Cover));
                })
                .AfterMap((src, dest) => dest.GenreMovies = new List<GenreMovie>());
            
            CreateMap<Movie, MovieViewModel>()
                .ForMember(dest => dest.Cover, opt =>
                    opt.MapFrom(src => Encoding.UTF8.GetString(src.Cover)));
            
            CreateMap<MovieWithGenresModel, MovieWithGenresViewModel>()
                .ForMember(dest => dest.Movie, opt =>
                    opt.MapFrom(src => src.Movie))
                .ForMember(dest => dest.GenreNames, opt =>
                    opt.MapFrom(src => src.Genres));
        }
    }
}
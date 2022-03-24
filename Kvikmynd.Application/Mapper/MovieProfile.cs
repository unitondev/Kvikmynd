using System.Collections.Generic;
using AutoMapper;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<MovieModel, Movie>()
                .AfterMap((src, dest) =>
                {
                    dest.GenreMovies ??= new List<GenreMovie>();
                    dest.MovieRatings ??= new List<MovieRating>();
                    dest.Comments ??= new List<Comment>();
                });
            
            CreateMap<EditMovieModel, Movie>()
                .AfterMap((src, dest) =>
                {
                    dest.GenreMovies = new List<GenreMovie>();
                    dest.MovieRatings ??= new List<MovieRating>();
                    dest.Comments ??= new List<Comment>();
                });

            CreateMap<Movie, MovieViewModel>();

            CreateMap<MovieWithGenresAndRatingsModel, MovieWithGenresAndRatingsViewModel>()
                .ForMember(dest => dest.Id, opt =>
                    opt.MapFrom(src => src.Movie.Id))
                .ForMember(dest => dest.Title, opt =>
                    opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.Description, opt =>
                    opt.MapFrom(src => src.Movie.Description))
                .ForMember(dest => dest.CoverUrl, opt =>
                    opt.MapFrom(src => src.Movie.CoverUrl))
                .ForMember(dest => dest.YoutubeLink, opt =>
                    opt.MapFrom(src => src.Movie.YoutubeLink))
                .ForMember(dest => dest.Genres, opt =>
                    opt.MapFrom(src => src.GenreMovies))
                .ForMember(dest => dest.Ratings, opt =>
                    opt.MapFrom(src => src.Ratings))
                .ForMember(dest => dest.Year, opt =>
                    opt.MapFrom(src => src.Movie.Year));


            CreateMap<MovieWithGenresModel, MovieWithGenresViewModel>()
                .ForMember(dest => dest.Movie, opt =>
                    opt.MapFrom(src => src.Movie))
                .ForMember(dest => dest.GenreNames, opt =>
                    opt.MapFrom(src => src.Genres));
        }
    }
}
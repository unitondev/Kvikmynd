using AutoMapper;
using MovieSite.Application.Models;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Mapper
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<CommentModel, Comment>();
        }
    }
}
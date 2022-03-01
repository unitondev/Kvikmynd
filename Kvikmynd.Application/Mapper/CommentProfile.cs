using AutoMapper;
using Kvikmynd.Application.Models;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<CommentModel, Comment>();
        }
    }
}
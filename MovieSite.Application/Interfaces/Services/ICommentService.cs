using System.Collections.Generic;
using System.Threading.Tasks;
using MovieSite.Application.Helper;
using MovieSite.Application.Models;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetCommentsAsync();
        Task<Result<Comment>> CreateCommentAsync(CommentRequest commentRequest);
        Task DeleteCommentByIdAsync(int commentId);
    }
}
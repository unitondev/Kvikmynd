using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Helper;

namespace MovieSite.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        
        [HttpPost("add_comment")]
        public async Task<IActionResult> CreateComment([FromBody] CommentRequest commentRequest)
        {
            var response = await _commentService.CreateCommentAsync(commentRequest);
            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpGet("delete_comment{commentId}")]
        public async Task<IActionResult> DeleteCommentById(int commentId)
        {
            await _commentService.DeleteCommentByIdAsync(commentId);
            return Ok();
        }
    }
}
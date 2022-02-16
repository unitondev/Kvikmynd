using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Helper;

namespace MovieSite.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CommentRequest commentRequest)
        {
            var response = await _commentService.CreateCommentAsync(commentRequest);
            return ResponseHandler.HandleResponseCode(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _commentService.DeleteCommentByIdAsync(id);
            return Ok();
        }
    }
}
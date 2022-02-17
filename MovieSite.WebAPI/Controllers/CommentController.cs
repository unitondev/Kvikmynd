using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Domain.Models;

namespace MovieSite.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly IService<Comment> _commentService;
        private readonly IMapper _mapper;

        public CommentController(IService<Comment> commentService, IMapper mapper)
        {
            _commentService = commentService;
            _mapper = mapper;
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CommentModel model)
        {
            var entity = _mapper.Map<CommentModel, Comment>(model);
            
            var result = await _commentService.CreateAsync(entity);
            if (!result.IsSucceeded) return BadRequest();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _commentService.GetByKeyAsync(id);
            
            var result = await _commentService.DeleteAsync(entity);
            if (!result.IsSucceeded) return BadRequest();
            
            return Ok();
        }
    }
}
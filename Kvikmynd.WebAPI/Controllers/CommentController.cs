using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kvikmynd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : BaseSimpleApiController
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
            if (!result.IsSucceeded) return CustomBadRequest(ErrorCode.CommentNotCreated);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _commentService.GetByKeyAsync(id);
            if (entity == null) return CustomNotFound(ErrorCode.CommentNotFound);

            var result = await _commentService.DeleteAsync(entity);
            if (!result.IsSucceeded) return CustomBadRequest(ErrorCode.CommentNotDeleted);
            
            
            return Ok();
        }
    }
}
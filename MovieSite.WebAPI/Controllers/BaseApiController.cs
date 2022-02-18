using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Models;

namespace MovieSite.Controllers
{
    public class BaseApiController : ControllerBase
    {
        [NonAction]
        public ObjectResult CustomNotFound(ErrorCode? code)
        {
            return NotFound(new Error(code ?? ErrorCode.Unspecified));
        }
        
        [NonAction]
        public ObjectResult CustomBadRequest(ErrorCode? code)
        {
            return BadRequest(new Error(code ?? ErrorCode.Unspecified));
        }
    }
}
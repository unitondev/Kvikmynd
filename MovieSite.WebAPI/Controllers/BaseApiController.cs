using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Models;

namespace MovieSite.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class BaseApiController : ControllerBase
    {
        public ObjectResult CustomNotFound(ErrorCode? code)
        {
            return NotFound(new Error(code ?? ErrorCode.Unspecified));
        }
        
        public ObjectResult CustomBadRequest(ErrorCode? code)
        {
            return BadRequest(new Error(code ?? ErrorCode.Unspecified));
        }
    }
}
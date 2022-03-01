using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kvikmynd.Controllers
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
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Common.Models;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kvikmynd.Controllers
{
    public class BaseSimpleApiController : ControllerBase
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
    
    public class BaseApiController : BaseSimpleApiController
    {
        private int? _userId;
        private ServiceResult<User> _user;
        private readonly IAccountService _accountService;

        public BaseApiController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [NonAction]
        protected async Task<int> GetUserIdAsync()
        {
            _userId ??= await _accountService.GetCurrentUserIdAsync();
            return _userId.Value;
        }
        
        [NonAction]
        protected async Task<User> GetUserAsync()
        {
            _user ??= await _accountService.GetCurrentUserAsync();
            return _user.Result;
        }
    }
}
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Interfaces.Services;

namespace MovieSite.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Users()
        {
            var result = await _userService.GetAllAsync();
            if (result == null)
                return BadRequest("Users not found");
            return Ok(result);
        }
        
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> UserId(Guid id)
        {
            var result = await _userService.GetByIdOrDefaultAsync(id);
            if (result == null)
                return BadRequest("User not found");
            return Ok(result);
        }
        
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser([FromBody] UserRegisterRequest registerRequest)
        {
            if (registerRequest == null)
                return BadRequest(new {message = "Register user not found"});

            if (ModelState.IsValid)
            {
                var result = await _userService.CreateAsync(registerRequest);
                if (result)
                    return Ok("User was registered");
                else
                    return BadRequest("User is already registered");
            }

            return BadRequest("Wrong register model!");
        }

        [HttpGet]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _userService.DeleteByIdAsync(id);

            if (!result)
                return BadRequest("User not found");
            return Ok("User was deleted");
        }

        [HttpGet]
        public IActionResult Secret()
        {
            return Ok("secret");
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] AuthRequestUser user)
        {
            var response = await _userService.AuthenticateAsync(user);

            if (response == null)
                return BadRequest(new { message = "User not found"});
            
            SetRefreshTokenCookie(response.RefreshToken);
            return Ok(response);
        }
        
        [HttpGet]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            var response =  await _userService.RefreshTokenAsync(refreshToken);

            if (response == null)
                return BadRequest(new {message = "Token not found"});
            
            SetRefreshTokenCookie(response.RefreshToken);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var response = await _userService.RevokeTokenAsync(revokedToken);
            
            if (response == false)
                return BadRequest(new { message = "User not found"});

            return Ok(new {message = "Token revoked"});
        }

        void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.Now.AddDays(7),
            };
            Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
        }
    }
}
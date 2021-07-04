using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Controllers
{
    [Authorize]
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
        public async Task<IEnumerable<User>> Users()
        {
            return await _userService.GetAllAsync();
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
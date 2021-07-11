using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Services;

namespace MovieSite.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAllAsync();
            if (result == null)
                return NotFound(Error.UserNotFound);
            return Ok(result);
        }
        
        [HttpGet("user{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserById(int id)
        {
            var result = await _userService.GetByIdOrDefaultAsync(id);
            if (result == null)
                return NotFound(Error.UserNotFound);
            return Ok(result);
        }
        
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterRequest registerRequest)
        {
            if (registerRequest == null)
                return NotFound(Error.UserNotFound);

            if (ModelState.IsValid)
            {
                var result = await _userService.CreateAsync(registerRequest);
                if (!result)
                    return BadRequest(Error.UserAlreadyExists);
                return Ok(new{message = "User was registered"});
            }

            return BadRequest(Error.ModelIsInvalid);
        }

        [HttpGet("delete{id}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            var result = await _userService.DeleteByIdAsync(id);

            if (!result)
                return BadRequest(Error.UserNotFound);
            return Ok(new {message = "User was deleted"});
        }

        [HttpGet("test")]
        public IActionResult Secret()
        {
            return Ok("secret");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AuthRequestUser user)
        {
            var response = await _userService.AuthenticateAsync(user);

            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    var result = SetRefreshTokenCookie(response.Value.RefreshToken);
            
                    if(result)
                        return Ok(response.Value);
                    return BadRequest(Error.ErrorWhileSettingRefreshToken);
                case HttpStatusCode.NotFound:
                    return NotFound();
                case HttpStatusCode.BadRequest:
                    return BadRequest(response.Message);
                default:
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Message);
            }
        }
        
        [HttpGet("refresh_token")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            var response =  await _userService.RefreshTokenAsync(refreshToken);

            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    var result = SetRefreshTokenCookie(response.Value.RefreshToken);
            
                    if(result)
                        return Ok(response.Value);
                    return BadRequest(Error.ErrorWhileSettingRefreshToken);
                case HttpStatusCode.NotFound:
                    return NotFound();
                case HttpStatusCode.BadRequest:
                    return BadRequest(response.Message);
                default:
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Message);
            }
        }

        [HttpGet("revoke_token")]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var response = await _userService.RevokeTokenAsync(revokedToken);
            
            if (response == false)
                return BadRequest(Error.UserNotFound);

            return Ok(new {message = "Token revoked"});
        }

        [HttpGet("logout")]
        public async Task<IActionResult> LogOut()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            var response = await _userService.LogOut(jwtToken);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    return Ok();
                case HttpStatusCode.NotFound:
                    return BadRequest(Error.UserNotFound);
                default:
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Message);
            }
        }

        private bool SetRefreshTokenCookie(string refreshToken)
        {
            try
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTimeOffset.Now.AddDays(7),
                };
                Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}
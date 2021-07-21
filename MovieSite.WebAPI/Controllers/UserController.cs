using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.DTO.Responses;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Helper;

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

        [AllowAnonymous]
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAllAsync();
            if (result == null)
                return NotFound(Error.UserNotFound);
            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpGet("user{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var result = await _userService.GetByIdOrDefaultAsync(id);
            if (result == null)
                return NotFound(Error.UserNotFound);
            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest registerRequest)
        {
            if (registerRequest == null)
                return NotFound(Error.UserNotFound);

            if (ModelState.IsValid)
            {
                var response = await _userService.CreateAsync(registerRequest);
                return HandleResponseCodeAndSetToken(response);
            }
            return BadRequest(Error.ModelIsInvalid);
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequestUser user)
        {
            var response = await _userService.AuthenticateAsync(user);
            return HandleResponseCodeAndSetToken(response);
        }
        
        [AllowAnonymous]
        [HttpGet("logout")]
        public async Task<IActionResult> LogOut()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            if(jwtToken != "undefined")
                await _userService.LogOut(jwtToken);
            return Ok();
        }

        [HttpPost("update_user")]
        public async Task<IActionResult> UpdateUser([FromBody] EditUserRequest user)
        {
            var response = await _userService.UpdateUserAsync(user);
            return ResponseHandler.HandleResponseCode(response);
        } 

        [HttpGet("delete_user")]
        public async Task<IActionResult> DeleteUser()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            await _userService.DeleteByIdFromJwtAsync(jwtToken);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("refresh_token")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            var response =  await _userService.RefreshTokenAsync(refreshToken);
            return HandleResponseCodeAndSetToken(response);
        }

        [HttpGet("revoke_token")]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var response = await _userService.RevokeTokenAsync(revokedToken);

            if (response == false)
                return BadRequest(Error.UserNotFound);

            return Ok();
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

        private IActionResult HandleResponseCodeAndSetToken(Result<AuthResponseUser> response)
        {
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    var result = SetRefreshTokenCookie(response.Value.RefreshToken);
            
                    if(result)
                        return Ok(response.Value);
                    return BadRequest(Error.ErrorWhileSettingRefreshToken);
                case HttpStatusCode.BadRequest:
                    return BadRequest(response.Message);
                case HttpStatusCode.NotFound:
                    return NotFound(response.Message);
                case HttpStatusCode.InternalServerError:
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Message);
                case HttpStatusCode.Unauthorized:
                    return Unauthorized(response.Message);
                default:
                    return StatusCode(StatusCodes.Status500InternalServerError, response.Message);
            }
        }
    }
}
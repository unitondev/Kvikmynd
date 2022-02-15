using System;
using System.Net;
using System.Threading.Tasks;
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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _accountService.GetByIdOrDefaultAsync(id);
            if (result == null) return NotFound(Error.UserNotFound);

            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            if (model.Password.Trim().Length != model.Password.Length)
            {
                return BadRequest(Error.PasswordSpacesAtTheBeginningOrAtTheEnd);
            }

            var response = await _accountService.CreateAsync(model);
            return HandleResponseCodeAndSetToken(response);
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserModel model)
        {
            var response = await _accountService.AuthenticateAsync(model);
            return HandleResponseCodeAndSetToken(response);
        }
        
        [AllowAnonymous]
        [HttpGet("logout")]
        public async Task<IActionResult> LogOut()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            if (jwtToken.Length == 0) return BadRequest(Error.TokenNotFound);
            
            await _accountService.LogOut(jwtToken);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditUserRequest user)
        {
            var response = await _accountService.UpdateUserAsync(user);
            return ResponseHandler.HandleResponseCode(response);
        } 

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            await _accountService.DeleteByIdFromJwtAsync(jwtToken);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            var response =  await _accountService.RefreshTokenAsync(refreshToken);

            return HandleResponseCodeAndSetToken(response);
        }

        [HttpGet("revokeToken")]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var response = await _accountService.RevokeTokenAsync(revokedToken);

            if (response == false) return BadRequest(Error.UserNotFound);

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
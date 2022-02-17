using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Common.Enums;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;
using MovieSite.Application.ViewModels;

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
            var result = await _accountService.FindByIdAsync(id);
            if (result == null) return NotFound(ErrorCode.UserNotFound);

            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            if (model.Password.Trim().Length != model.Password.Length)
            {
                return BadRequest(ErrorCode.PasswordSpacesAtTheBeginningOrAtTheEnd);
            }

            var result = await _accountService.RegisterAsync(model);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }

            var setRefreshTokenResult = SetRefreshTokenCookie(result.Result.RefreshToken);
            if (!setRefreshTokenResult)
            {
                return BadRequest(ErrorCode.ErrorWhileSettingRefreshToken);
            }
            
            return Ok(result.Result);
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserModel model)
        {
            var result = await _accountService.LoginAsync(model);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }
            
            var setRefreshTokenResult = SetRefreshTokenCookie(result.Result.RefreshToken);
            if (!setRefreshTokenResult)
            {
                return BadRequest(ErrorCode.ErrorWhileSettingRefreshToken);
            }
            
            return Ok(result.Result);
        }
        
        [AllowAnonymous]
        [HttpGet("logout")]
        public async Task<IActionResult> LogOut()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            if (jwtToken.Length == 0) return BadRequest(ErrorCode.AccessTokenNotFound);
            
            var result = await _accountService.LogOut(jwtToken);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditUserRequest user)
        {
            var result = await _accountService.UpdateUserAsync(user);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }

            return Ok(result.Result);
        } 

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            
            var result = await _accountService.DeleteByJwtTokenAsync(jwtToken);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest(ErrorCode.RefreshTokenNotFound);
            }
            
            var result =  await _accountService.RefreshTokenAsync(refreshToken);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }

            var setRefreshTokenResult = SetRefreshTokenCookie(result.Result.RefreshToken);
            if (!setRefreshTokenResult)
            {
                return BadRequest(ErrorCode.ErrorWhileSettingRefreshToken);
            }
            
            return Ok(result.Result);
        }

        [HttpGet("revokeToken")]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var result = await _accountService.RevokeTokenAsync(revokedToken);
            if (!result.IsSucceeded)
            {
                return BadRequest(result.Error);
            }

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
    }
}
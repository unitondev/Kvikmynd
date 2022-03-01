using System;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Kvikmynd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;

        public AccountController(IAccountService accountService, UserManager<User> userManager)
        {
            _accountService = accountService;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _accountService.FindByIdAsync(id);
            if (result == null) return CustomNotFound(ErrorCode.UserNotFound);

            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            if (model.Password.Trim().Length != model.Password.Length)
            {
                return CustomBadRequest(ErrorCode.PasswordSpacesAtTheBeginningOrAtTheEnd);
            }

            var result = await _accountService.RegisterAsync(model);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            var setRefreshTokenResult = SetRefreshTokenCookie(result.Result.RefreshToken.Token);
            if (!setRefreshTokenResult)
            {
                return CustomBadRequest(ErrorCode.ErrorWhileSettingRefreshToken);
            }
            
            return Ok(result.Result.JwtToken);
        }

        [AllowAnonymous]
        [HttpGet("logout")]
        public async Task<IActionResult> LogOut()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            if (jwtToken.Length == 0) return CustomNotFound(ErrorCode.AccessTokenNotFound);
            
            var result = await _accountService.LogOut(jwtToken);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateUserModel user)
        {
            var result = await _accountService.UpdateUserAsync(user);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok(result.Result);
        } 

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            if (jwtToken.Length == 0) return CustomNotFound(ErrorCode.AccessTokenNotFound);
            
            var result = await _accountService.DeleteByJwtTokenAsync(jwtToken);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet("revokeToken")]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var result = await _accountService.RevokeTokenAsync(revokedToken);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            if (jwtToken.Length == 0) return CustomNotFound(ErrorCode.AccessTokenNotFound);

            var result = await _accountService.GetCurrentUserAsync(jwtToken);
            if (!result.IsSucceeded) return CustomBadRequest(result.Error);

            var userViewModel = new UserViewModel(result.Result, "");

            return Ok(userViewModel);
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangeUserPasswordModel model)
        {
            if (model.NewPassword.Trim().Length != model.NewPassword.Length)
            {
                return CustomBadRequest(ErrorCode.PasswordSpacesAtTheBeginningOrAtTheEnd);
            }
            
            var jwtToken = Request.Headers["Authorization"].ToString().Split()[1];
            
            var userResult = await _accountService.GetCurrentUserAsync(jwtToken);
            if (!userResult.IsSucceeded) return CustomBadRequest(userResult.Error);

            if (_userManager.PasswordHasher.VerifyHashedPassword(userResult.Result, userResult.Result.PasswordHash,
                model.CurrentPassword) == PasswordVerificationResult.Failed)
            {
                return CustomBadRequest(ErrorCode.CurrentPasswordIncorrect);
            }
            
            if (_userManager.PasswordHasher.VerifyHashedPassword(userResult.Result, userResult.Result.PasswordHash,
                model.NewPassword) == PasswordVerificationResult.Success)
            {
                return CustomBadRequest(ErrorCode.NewPasswordCanNotMatсhCurrentPassword);
            }

            var result = await _userManager.ChangePasswordAsync(userResult.Result, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return CustomBadRequest(ErrorCode.PasswordNotChanged);
            }

            return NoContent();
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
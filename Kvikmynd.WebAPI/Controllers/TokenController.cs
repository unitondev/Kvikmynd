using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Kvikmynd.Controllers
{
    [ApiController]
    public class TokenController : BaseSimpleApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;

        public TokenController(ITokenService tokenService, IAccountService accountService, UserManager<User> userManager)
        {
            _tokenService = tokenService;
            _accountService = accountService;
            _userManager = userManager;
        }

        [HttpPost("api/token")]
        public async Task<IActionResult> LoginViaEmailAndPassword([FromBody] LoginUserModel model)
        {
            var result = await _accountService.FindByEmailAndCheckCredentialsAsync(model.Email, model.Password);
            if (!result.IsSucceeded) return CustomBadRequest(result.Error);
            
            var userRoles = await _userManager.GetRolesAsync(result.Result);
            var claims = userRoles.Select(s => new Claim(ClaimTypes.Role, s)).ToList();
            
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(result.Result.Id)));

            var jwtToken = _tokenService.GetJwtToken(claims);

            var refreshTokenResult = await _accountService.GenerateAndSetRefreshToken(result.Result.Id);
            if (!refreshTokenResult.IsSucceeded) return CustomBadRequest(refreshTokenResult.Error);

            var setRefreshTokenResult = SetRefreshTokenCookie(refreshTokenResult.Result.Token);
            if (!setRefreshTokenResult)
            {
                return CustomBadRequest(ErrorCode.ErrorWhileSettingRefreshToken);
            }
            
            return Ok(jwtToken);
        }
        
        [HttpGet("api/refreshToken")]
        public async Task<IActionResult> LoginViaRefreshToken()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return CustomNotFound(ErrorCode.RefreshTokenNotFound);
            }

            var result = await _accountService.RefreshTokenAsync(refreshToken);
            if (!result.IsSucceeded) return CustomBadRequest(result.Error);
            
            var setRefreshTokenResult = SetRefreshTokenCookie(result.Result.RefreshToken.Token);
            if (!setRefreshTokenResult)
            {
                return CustomBadRequest(ErrorCode.ErrorWhileSettingRefreshToken);
            }
            
            return Ok(result.Result.JwtToken);
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
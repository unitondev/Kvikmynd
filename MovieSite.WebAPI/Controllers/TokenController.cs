using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Models;

namespace MovieSite.Controllers
{
    [ApiController]
    public class TokenController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IAccountService _accountService;

        public TokenController(ITokenService tokenService, IAccountService accountService)
        {
            _tokenService = tokenService;
            _accountService = accountService;
        }

        [HttpPost("api/token")]
        public async Task<IActionResult> LoginViaEmailAndPassword([FromBody] LoginUserModel model)
        {
            var result = await _accountService.FindByEmailAndCheckCredentialsAsync(model.Email, model.Password);
            if (!result.IsSucceeded) return CustomBadRequest(result.Error);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(result.Result.Id))
            };

            var jwtToken = _tokenService.GetJwtToken(claims);

            return Ok(jwtToken);
        }
    }
}
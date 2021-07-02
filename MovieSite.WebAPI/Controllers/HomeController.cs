using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Ok("hello");
        }

        [HttpGet]
        [Authorize]
        public IActionResult Secret()
        {
            return Ok("secret");
        }

        [HttpGet]
        public IActionResult Authenticate()
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, "id")
            };

            var secretBytes = Encoding.UTF8.GetBytes(Constants.Secret);
            var securityKey = new SymmetricSecurityKey(secretBytes);
            var algorithm = SecurityAlgorithms.HmacSha256;
            
            var signingCredentials = new SigningCredentials(securityKey, algorithm);
            
            var token = new JwtSecurityToken(
                Constants.Issuer,
                Constants.Audience, 
                claims,
                notBefore: DateTime.Now, 
                expires: DateTime.Now.AddDays(1),
                signingCredentials);

            var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new {accesToken = tokenJson});
        }
    }
}
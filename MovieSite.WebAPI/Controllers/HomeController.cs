using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieSite.Domain.Models;
using MovieSite.Infrastructure;
using MovieSite.Jwt;

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
        public IEnumerable<User> Users([FromServices] MovieSiteDbContext dbContext)
        {
            return dbContext.Users.ToList();
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
            
            IJwtSigningEncodingKey signingEncodingKey = new SigningSymetricKey();
            var token = new JwtSecurityToken(
                Constants.Issuer,
                Constants.Audience, 
                claims,
                notBefore: DateTime.Now, 
                expires: DateTime.Now.AddDays(1),
                new SigningCredentials(
                    signingEncodingKey.GetKey(),
                    signingEncodingKey.SigningAlgorithm));

            var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new {accesToken = tokenJson});
        }
    }
}
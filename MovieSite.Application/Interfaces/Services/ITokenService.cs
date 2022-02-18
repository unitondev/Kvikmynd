using System.Collections.Generic;
using System.Security.Claims;
using MovieSite.Application.Authentication;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface ITokenService
    {
        JwtToken GetJwtToken(IEnumerable<Claim> claims);
        RefreshToken GenerateRefreshToken();
    }
}

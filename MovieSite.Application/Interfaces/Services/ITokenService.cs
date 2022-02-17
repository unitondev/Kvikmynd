using System.Collections.Generic;
using System.Security.Claims;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Interfaces.Services
{
    public interface ITokenService
    {
        string GetJwtToken(IEnumerable<Claim> claims);
        RefreshToken GenerateRefreshToken();
    }
}

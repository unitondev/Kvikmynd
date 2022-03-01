using System.Collections.Generic;
using System.Security.Claims;
using Kvikmynd.Application.Authentication;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface ITokenService
    {
        JwtToken GetJwtToken(IEnumerable<Claim> claims);
        RefreshToken GenerateRefreshToken();
    }
}

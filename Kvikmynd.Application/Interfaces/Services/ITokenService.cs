using System.Collections.Generic;
using System.Security.Claims;
using Kvikmynd.Application.Authentication;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface ITokenService
    {
        JwtResponseModel GetJwtResponseModel(IEnumerable<Claim> claims);
        RefreshToken GenerateRefreshToken();
    }
}

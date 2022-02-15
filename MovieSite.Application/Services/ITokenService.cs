using System.Collections.Generic;
using System.Security.Claims;

namespace MovieSite.Application.Services
{
    public interface ITokenService
    {
        string GetJwtToken(IEnumerable<Claim> claims);
    }
}

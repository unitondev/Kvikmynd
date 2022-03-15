using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Kvikmynd.Application.Common.Helper
{
    public static class JwtDecoder
    {
        public static Dictionary<string, string> DecodeJwt(string jwtPlainText)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(jwtPlainText);
            var userId = jwtToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
            var result = new Dictionary<string, string>
            {
                {"userId", userId}
            };
            return result;
        }
    }
}
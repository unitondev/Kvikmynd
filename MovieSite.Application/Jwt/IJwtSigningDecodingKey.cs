using Microsoft.IdentityModel.Tokens;

namespace MovieSite.Application.Jwt
{
    public interface IJwtSigningDecodingKey
    {
        public SecurityKey GetKey();
    }
}
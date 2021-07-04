using Microsoft.IdentityModel.Tokens;

namespace MovieSite.Jwt
{
    public interface IJwtSigningDecodingKey
    {
        public SecurityKey GetKey();
    }
}
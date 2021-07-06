using Microsoft.IdentityModel.Tokens;

namespace MovieSite.Application.Jwt
{
    public interface IJwtSigningEncodingKey
    {
        string SigningAlgorithm { get; }
        public SecurityKey GetKey();

    }
}
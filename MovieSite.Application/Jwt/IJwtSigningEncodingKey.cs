using Microsoft.IdentityModel.Tokens;

namespace MovieSite.Jwt
{
    public interface IJwtSigningEncodingKey
    {
        // private, generation jwt
        string SigningAlgorithm { get; }
        public SecurityKey GetKey();

    }
}
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MovieSite.Application.Jwt;

namespace MovieSite.Jwt
{
    public class SigningSymetricKey : IJwtSigningDecodingKey, IJwtSigningEncodingKey
    {
        private readonly SymmetricSecurityKey _secretKey;
        public string SigningAlgorithm { get; } = SecurityAlgorithms.HmacSha256;
        
        public SigningSymetricKey(string secret)
        {
            _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        }
        public SecurityKey GetKey()
        {
            return _secretKey;
        }
    }
}
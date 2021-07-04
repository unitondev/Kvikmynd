using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace MovieSite.Jwt
{
    public class SigningSymetricKey : IJwtSigningDecodingKey, IJwtSigningEncodingKey
    {
        private readonly SymmetricSecurityKey _secretKey;
        public string SigningAlgorithm { get; } = SecurityAlgorithms.HmacSha256;
        
        public SigningSymetricKey()
        {
            _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.Secret));
        }
        public SecurityKey GetKey()
        {
            return _secretKey;
        }
    }
}
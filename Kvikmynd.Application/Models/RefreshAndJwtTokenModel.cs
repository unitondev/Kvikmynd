using Kvikmynd.Application.Authentication;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models
{
    public class RefreshAndJwtTokenModel
    {
        public JwtResponseModel JwtResponseModel { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}
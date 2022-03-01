using Kvikmynd.Application.Authentication;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models
{
    public class RefreshAndJwtTokenModel
    {
        public JwtToken JwtToken { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}
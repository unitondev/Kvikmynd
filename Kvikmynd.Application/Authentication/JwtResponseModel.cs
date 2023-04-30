using System.ComponentModel.DataAnnotations;

namespace Kvikmynd.Application.Authentication
{
    public class JwtResponseModel
    {
        [Required]
        public string AccessToken { get; set; }
        public long ExpiresIn { get; set; }
        [Required]
        public string TokenType { get; set; }
    }
}
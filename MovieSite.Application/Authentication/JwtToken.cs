using System.ComponentModel.DataAnnotations;

namespace MovieSite.Application.Authentication
{
    public class JwtToken
    {
        [Required]
        public string AccessToken { get; set; }
        public long ExpiresIn { get; set; }
        [Required]
        public string TokenType { get; set; }
    }
}
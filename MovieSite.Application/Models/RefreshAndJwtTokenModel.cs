using MovieSite.Application.Authentication;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Models
{
    public class RefreshAndJwtTokenModel
    {
        public JwtToken JwtToken { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}
using System.Text;
using System.Text.Json.Serialization;
using MovieSite.Domain.Models;

namespace MovieSite.Application.DTO.Responses
{
    public class AuthResponseUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string JwtToken { get; set; }
        public string UserName { get; set; }
        public string Avatar { get; set; }

        [JsonIgnore] // cause refresh token returns in http only cookie
        public string RefreshToken { get; set; }

        public AuthResponseUser() {}
        public AuthResponseUser(User user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            FullName = user.FullName;
            Email = user.Email;
            UserName = user.UserName;
            Avatar = user.Avatar;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
using System;
using System.Text.Json.Serialization;
using MovieSite.Domain.Models;

namespace MovieSite.Application.DTO
{
    public class AuthResponseUser
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // cause refresh token returns in http only cookie
        public string RefreshToken { get; set; }

        public AuthResponseUser(User user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            FullName = user.FullName;
            Email = user.Email;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
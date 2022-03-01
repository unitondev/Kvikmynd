using System.Text;
using System.Text.Json.Serialization;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Avatar { get; set; }
        [JsonIgnore] // cause refresh token returns in http only cookie
        public string RefreshToken { get; set; }

        public UserViewModel() {}
        public UserViewModel(User user, string refreshToken)
        {
            Id = user.Id;
            FullName = user.FullName;
            Email = user.Email;
            UserName = user.UserName;
            Avatar = Encoding.UTF8.GetString(user.Avatar);
            RefreshToken = refreshToken;
        }
    }
}
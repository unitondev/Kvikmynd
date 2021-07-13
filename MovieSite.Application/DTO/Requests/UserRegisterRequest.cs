using System.ComponentModel.DataAnnotations;

namespace MovieSite.Application.DTO.Requests
{
    public class UserRegisterRequest
    {
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
        [Required]
        [MaxLength(25)]
        public string Username { get; set; }
        [Required]
        [MaxLength(25)]
        public string FullName { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        public string Avatar { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace MovieSite.Application.DTO
{
    public class AuthRequestUser
    {
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
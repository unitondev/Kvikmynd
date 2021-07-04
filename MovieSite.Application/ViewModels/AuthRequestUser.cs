using System.ComponentModel.DataAnnotations;

namespace MovieSite.Infrastructure.ViewModels
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
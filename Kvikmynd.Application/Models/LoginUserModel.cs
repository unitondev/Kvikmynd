using System.ComponentModel.DataAnnotations;

namespace Kvikmynd.Application.Models
{
    public class LoginUserModel
    {
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
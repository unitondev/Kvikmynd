using System.ComponentModel.DataAnnotations;

namespace Kvikmynd.Application.Models
{
    public class UserRegistrationModel
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
        [MaxLength(128)]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,128}$", ErrorMessage = "Password must contain at least one upper case letter, one lower case letter, one digit and one special character")]
        public string Password { get; set; }
        public string Avatar { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace MovieSite.Application.Models
{
    public class ChangeUserPasswordModel
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(128)]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,128}$", ErrorMessage = "Password must contain at least one upper case letter, one lower case letter, one digit and one special character")]
        public string NewPassword { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace MovieSite.Application.DTO.Requests
{
    public class EditUserRequest
    {
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
     
        [MaxLength(25)]
        public string Username { get; set; }
     
        [MaxLength(25)]
        public string FullName { get; set; }
     
        [Required]
        [MinLength(6)]
        public string OldPassword { get; set; }
        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }

        public string Avatar { get; set; }
    }
}
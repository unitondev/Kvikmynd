using System.ComponentModel.DataAnnotations;

namespace MovieSite.Domain.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(25)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string PasswordHash { get; set; }
    }
}
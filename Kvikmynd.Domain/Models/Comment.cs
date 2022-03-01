using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Kvikmynd.Domain.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(1024)]
        public string Text { get; set; }
        [Required]
        public int UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [Required]
        public int MovieId { get; set; }
        [JsonIgnore]
        public virtual Movie Movie { get; set; }
    }
}
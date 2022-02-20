using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace MovieSite.Domain.Models
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
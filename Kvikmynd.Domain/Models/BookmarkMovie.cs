using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Kvikmynd.Domain.Models
{
    public class BookmarkMovie
    {
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
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Kvikmynd.Domain.Models
{
    public class GenreMovie
    {
        [Required]
        public int GenreId { get; set; }
        [JsonIgnore]
        public virtual Genre Genre { get; set; }
        
        [Required]
        public int MovieId { get; set; }
        [JsonIgnore]
        public virtual Movie Movie { get; set; }
    }
}
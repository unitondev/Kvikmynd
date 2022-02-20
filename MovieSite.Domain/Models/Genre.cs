using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieSite.Domain.Models
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(64)]
        public string Name { get; set; }
        [JsonIgnore]
        public virtual IList<GenreMovie> GenreMovies { get; set; }
    }
}
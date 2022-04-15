using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Kvikmynd.Domain.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        [MaxLength((256))]
        public string Title { get; set; }
        [MaxLength(2048)]
        public string Description { get; set; }
        public string CoverUrl { get; set; }
        [MaxLength(128)]
        public string YoutubeLink { get; set; }
        public int Year { get; set; }
        [JsonIgnore]
        public virtual IList<GenreMovie> GenreMovies { get; set; }
        [JsonIgnore]
        public virtual IList<MovieRating> MovieRatings { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        public virtual IList<BookmarkMovie> BookmarkMovies { get; set; }
    }
}
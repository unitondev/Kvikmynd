using System.Text.Json.Serialization;

namespace MovieSite.Domain.Models
{
    public class MovieRating
    {
        public int Value { get; set; }
        public int MovieId { get; set; }
        [JsonIgnore]
        public Movie Movie { get; set; }
        
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
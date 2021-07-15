using System.Collections.Generic;

namespace MovieSite.Domain.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] Cover { get; set; }
        public string YoutubeLink { get; set; }
        
        public IList<GenreMovie> GenreMovies { get; set; }
        public IList<MovieRating> MovieRatings { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
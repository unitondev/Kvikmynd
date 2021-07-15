namespace MovieSite.Domain.Models
{
    public class MovieRating
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        
        public int RatingId { get; set; }
        public Rating Rating { get; set; }
    }
}
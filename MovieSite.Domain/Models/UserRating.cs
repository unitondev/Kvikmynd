namespace MovieSite.Domain.Models
{
    public class UserRating
    {
        public int UserId { get; set; } 
        public User User { get; set; }
        
        public int RatingId { get; set; } 
        public Rating Rating { get; set; }
    }
}
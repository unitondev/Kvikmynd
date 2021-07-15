using System.Collections.Generic;

namespace MovieSite.Domain.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Value { get; set; }
        
        public IList<MovieRating> MovieRatings { get; set; }
        public IList<UserRating> UserRatings { get; set; }
    }
}
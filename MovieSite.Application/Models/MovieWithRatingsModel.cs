using System.Collections.Generic;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Models
{
    public class MovieWithRatingsModel
    {
        public Movie Movie { get; set; }
        public IList<MovieRating> Ratings { get; set; }
    }
}
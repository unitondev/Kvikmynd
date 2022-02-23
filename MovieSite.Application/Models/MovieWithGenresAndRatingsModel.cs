using System.Collections.Generic;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Models
{
    public class MovieWithGenresAndRatingsModel
    {
        public Movie Movie { get; set; }
        public IList<GenreMovie> GenreMovies { get; set; }
        public IList<MovieRating> Ratings { get; set; }
    }
}
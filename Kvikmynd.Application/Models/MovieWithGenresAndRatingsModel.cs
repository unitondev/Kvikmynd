using System.Collections.Generic;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models
{
    public class MovieWithGenresAndRatingsModel
    {
        public Movie Movie { get; set; }
        public IList<GenreMovie> GenreMovies { get; set; }
        public IList<MovieRating> Ratings { get; set; }
        public bool IsBookmark { get; set; }
    }
}
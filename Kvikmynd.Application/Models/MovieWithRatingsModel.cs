using System.Collections.Generic;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models
{
    public class MovieWithRatingsModel
    {
        public Movie Movie { get; set; }
        public IList<MovieRating> Ratings { get; set; }
    }
}
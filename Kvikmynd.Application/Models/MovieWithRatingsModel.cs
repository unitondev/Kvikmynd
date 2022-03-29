using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models
{
    public class MovieWithRatingsModel
    {
        public Movie Movie { get; set; }
        public MovieRating MovieRating { get; set; }
        public bool IsBookmark { get; set; }
    }
}
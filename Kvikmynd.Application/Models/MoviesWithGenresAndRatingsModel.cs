using System.Collections.Generic;

namespace Kvikmynd.Application.Models
{
    public class MoviesWithGenresAndRatingsModel
    {
        public List<MovieWithGenresAndRatingsModel> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
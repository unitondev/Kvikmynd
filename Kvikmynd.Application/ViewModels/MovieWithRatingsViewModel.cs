using System.Collections.Generic;

namespace Kvikmynd.Application.ViewModels
{
    public class MovieWithRatingsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; } 
        public string YoutubeLink { get; set; }
        public int Year { get; set; }
        public MovieRatingViewModel Rating { get; set; }
    }
}
using System.Collections.Generic;

namespace MovieSite.Application.ViewModels
{
    public class MovieWithGenresAndRatingsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; } 
        public string YoutubeLink { get; set; }
        public IList<GenreViewModel> Genres { get; set; }
        public IList<MovieRatingViewModel> Ratings { get; set; }
    }
}
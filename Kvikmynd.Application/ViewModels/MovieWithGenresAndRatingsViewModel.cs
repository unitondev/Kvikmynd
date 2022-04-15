using System.Collections.Generic;

namespace Kvikmynd.Application.ViewModels
{
    public class MovieWithGenresAndRatingsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; } 
        public string YoutubeLink { get; set; }
        public int Year { get; set; }
        public bool IsDeleted { get; set; }
        public IList<GenreModel> Genres { get; set; }
        public IList<MovieRatingViewModel> Ratings { get; set; }
        public bool IsBookmark { get; set; }
    }
}
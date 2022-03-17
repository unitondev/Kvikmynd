using System.Collections.Generic;

namespace Kvikmynd.Application.Models
{
    public class EditMovieModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; }
        public string YoutubeLink { get; set; }
        public int Year { get; set; }
        public List<string> Genres { get; set; }
    }
}
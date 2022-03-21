using System.Collections.Generic;
using Kvikmynd.Application.ViewModels;

namespace Kvikmynd.Application.Models
{
    public class MovieModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; }
        public string YoutubeLink { get; set; }
        public int Year { get; set; }
        public List<GenreModel> Genres { get; set; }
    }
}
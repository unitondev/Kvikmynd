using System.Collections.Generic;
using MovieSite.Application.DTO.Responses;

namespace MovieSite.ViewModels
{
    public class MovieWithGenresViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] Cover { get; set; }
        public string YoutubeLink { get; set; }
        public double Rating { get; set; }
        public IReadOnlyList<string> Genres { get; set; }
    }
}
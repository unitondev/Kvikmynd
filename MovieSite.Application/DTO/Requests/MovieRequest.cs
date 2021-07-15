using System.Collections.Generic;
using MovieSite.Domain.Models;

namespace MovieSite.Application.DTO.Requests
{
    public class MovieRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; }
        public string YoutubeLink { get; set; }
        public IList<GenreMovie> GenreMovies { get; set; }
    }
}
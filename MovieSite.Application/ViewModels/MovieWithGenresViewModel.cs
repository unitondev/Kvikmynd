using System.Collections.Generic;
using MovieSite.Application.DTO.Responses;

namespace MovieSite.ViewModels
{
    public class MovieWithGenresViewModel
    {
        public MovieResponse Movie { get; set; }
        public List<string> GenreNames { get; set; }
    }
}
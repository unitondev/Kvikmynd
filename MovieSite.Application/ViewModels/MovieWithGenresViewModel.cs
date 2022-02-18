using System.Collections.Generic;
using MovieSite.Application.ViewModels;

namespace MovieSite.ViewModels
{
    public class MovieWithGenresViewModel
    {
        public MovieResponse Movie { get; set; }
        public List<GenreViewModel> GenreNames { get; set; }
    }
}
using System.Collections.Generic;
using MovieSite.Domain.Models;

namespace MovieSite.Application.ViewModels
{
    public class MovieWithGenresResponse
    {
        public Movie Movie { get; set; }
        public List<string> GenreNames { get; set; }
    }
}
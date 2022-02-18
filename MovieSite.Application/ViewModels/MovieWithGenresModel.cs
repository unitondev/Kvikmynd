using System.Collections.Generic;
using MovieSite.Domain.Models;

namespace MovieSite.Application.ViewModels
{
    public class MovieWithGenresModel
    {
        public Movie Movie { get; set; }
        public List<Genre> Genres { get; set; }
    }
}
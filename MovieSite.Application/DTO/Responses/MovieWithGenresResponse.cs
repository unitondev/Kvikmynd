using System.Collections.Generic;
using MovieSite.Domain.Models;

namespace MovieSite.Application.DTO.Responses
{
    public class MovieWithGenresResponse
    {
        public Movie Movie { get; set; }
        public List<string> GenreNames { get; set; }
    }
}
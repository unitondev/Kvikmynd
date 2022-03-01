using System.Collections.Generic;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models
{
    public class MovieWithGenresModel
    {
        public Movie Movie { get; set; }
        public List<Genre> Genres { get; set; }
    }
}
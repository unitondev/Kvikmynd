using System.Collections.Generic;

namespace MovieSite.Domain.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public IList<GenreMovie> GenreMovies { get; set; }
    }
}
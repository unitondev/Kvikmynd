using System.Text;

namespace MovieSite.Application.DTO.Responses
{
    public class MovieResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; } 
        public string YoutubeLink { get; set; }
        public double Rating { get; set; }
    }
}
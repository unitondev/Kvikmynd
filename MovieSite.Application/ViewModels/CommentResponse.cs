using System.Text.Json.Serialization;
using MovieSite.Domain.Models;

namespace MovieSite.Application.ViewModels
{
    public class CommentResponse
    {
        public int Id { get; set; }
        public string Text { get; set; }
        
        public int UserId { get; set; }
        public EditUserResponse User { get; set; }
        public int MovieId { get; set; }
        [JsonIgnore]
        public Movie Movie { get; set; }
    }
}
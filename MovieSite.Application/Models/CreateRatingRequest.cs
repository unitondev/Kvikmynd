namespace MovieSite.Application.Models
{
    public class CreateRatingRequest
    {
        public int Value { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
    }
}
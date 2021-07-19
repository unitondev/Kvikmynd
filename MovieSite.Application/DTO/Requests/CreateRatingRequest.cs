namespace MovieSite.Application.DTO.Requests
{
    public class CreateRatingRequest
    {
        public int Value { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
    }
}
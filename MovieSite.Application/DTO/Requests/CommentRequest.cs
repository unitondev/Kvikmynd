namespace MovieSite.Application.DTO.Requests
{
    public class CommentRequest
    {
        public string Text { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
    }
}
namespace MovieSite.Application.Models
{
    public class CommentModel
    {
        public string Text { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
    }
}
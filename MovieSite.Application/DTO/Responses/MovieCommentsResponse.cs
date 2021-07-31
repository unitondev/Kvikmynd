namespace MovieSite.Application.DTO.Responses
{
    public class MovieCommentsResponse
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public string UserName { get; set; }
        public string UserAvatar { get; set; }
    }
}
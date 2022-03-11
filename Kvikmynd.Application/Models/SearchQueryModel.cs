namespace Kvikmynd.Application.Models
{
    public class SearchQueryModel
    {
        public string SearchQuery { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
namespace Kvikmynd.Application.Models
{
    public class SearchQueryModel : PagintaionModel
    {
        public string SearchQuery { get; set; }
        public int? UserId { get; set; }
        public bool AreDeletedMovies { get; set; } = false;
    }
}
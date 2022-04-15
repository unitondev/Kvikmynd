namespace Kvikmynd.Application.Models
{
    public class GetMoviesRatingsModel : PagintaionModel
    {
        public int UserId { get; set; }
        public string Order { get; set; }
    }
}
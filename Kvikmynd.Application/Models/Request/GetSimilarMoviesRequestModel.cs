using System.Collections.Generic;
using Kvikmynd.Application.ViewModels;

namespace Kvikmynd.Application.Models.Request;

public class GetSimilarMoviesRequestModel
{
    public int MovieId { get; set; }
    public string Title { get; set; }
    public IList<int> GenreIds { get; set; }
}
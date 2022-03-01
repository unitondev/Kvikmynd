using System.Collections.Generic;

namespace Kvikmynd.Application.ViewModels
{
    public class MovieWithGenresViewModel
    {
        public MovieViewModel Movie { get; set; }
        public List<GenreViewModel> GenreNames { get; set; }
    }
}
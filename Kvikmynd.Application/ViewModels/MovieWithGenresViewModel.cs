using System.Collections.Generic;

namespace Kvikmynd.Application.ViewModels
{
    public class MovieWithGenresViewModel
    {
        public MovieViewModel Movie { get; set; }
        public List<GenreModel> GenreNames { get; set; }
    }
}
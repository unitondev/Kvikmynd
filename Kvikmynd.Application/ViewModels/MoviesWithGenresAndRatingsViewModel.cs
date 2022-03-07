using System.Collections.Generic;

namespace Kvikmynd.Application.ViewModels
{
    public class MoviesWithGenresAndRatingsViewModel
    {
        public List<MovieWithGenresAndRatingsViewModel> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
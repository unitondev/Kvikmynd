using System.Collections.Generic;

namespace Kvikmynd.Application.ViewModels
{
    public class TotalCountViewModel<T> where T : class
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
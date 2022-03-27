using System.ComponentModel.DataAnnotations;

namespace Kvikmynd.Domain.Models
{
    public class BookmarkMovie
    {
        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        [Required]
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
    }
}
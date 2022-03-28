using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Kvikmynd.Domain.Models
{
    public class User : IdentityUser<int>
    {
        [Required]
        [MaxLength(25)]
        public string FullName { get; set; }
        public string AvatarUrl { get; set; }
        [JsonIgnore]
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        [JsonIgnore]
        public virtual IList<MovieRating> MovieRatings { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        public virtual IList<BookmarkMovie> BookmarkMovies { get; set; }
    }
}
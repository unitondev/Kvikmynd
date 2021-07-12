using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace MovieSite.Domain.Models
{
    public class User : IdentityUser<int>
    {
        [Required]
        [MaxLength(25)]
        public string FullName { get; set; }
        

        [JsonIgnore]
        public ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}
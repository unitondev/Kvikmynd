﻿using System.Text.Json.Serialization;

namespace MovieSite.Domain.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public int MovieId { get; set; }
        [JsonIgnore]
        public Movie Movie { get; set; }
    }
}
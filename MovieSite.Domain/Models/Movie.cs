﻿using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace MovieSite.Domain.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] Cover { get; set; } = Encoding.UTF8.GetBytes(BaseCover);
        public string YoutubeLink { get; set; }
        public double Rating { get; set; }
        [JsonIgnore]
        public IList<GenreMovie> GenreMovies { get; set; }
        [JsonIgnore]
        public IList<MovieRating> MovieRatings { get; set; }
        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        private const string BaseCover = "data:image/png;base64,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";
    }
}
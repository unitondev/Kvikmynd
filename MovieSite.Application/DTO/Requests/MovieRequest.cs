﻿using System.Collections.Generic;

namespace MovieSite.Application.DTO.Requests
{
    public class MovieRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Cover { get; set; }
        public string YoutubeLink { get; set; }
        public List<string> Genres { get; set; }
    }
}
﻿using System.ComponentModel.DataAnnotations;

namespace MovieSite.Application.DTO.Requests
{
    public class UserRegisterRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [MaxLength(25)]
        public string Username { get; set; }
        [Required]
        [MaxLength(25)]
        public string FullName { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
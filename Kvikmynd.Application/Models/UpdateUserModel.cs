﻿using System.ComponentModel.DataAnnotations;

namespace Kvikmynd.Application.Models
{
    public class UpdateUserModel
    {
        [Required]
        [MaxLength(256)]
        public string Email { get; set; }
        [MaxLength(256)]
        public string Username { get; set; }
        [MaxLength(25)]
        public string FullName { get; set; }
        public string Avatar { get; set; }
    }
}
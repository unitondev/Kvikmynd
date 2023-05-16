using System;
using System.ComponentModel.DataAnnotations;
using Kvikmynd.Domain;

namespace Kvikmynd.Application.Models;

public class UpdateSubscriptionModel
{
    [Required]
    public int Id { get; set; }
    
    [Required]
    public int UserId { get; set; }
    
    [Required]
    public SubscriptionType Type { get; set; }
    
    [Required]
    public bool Paid { get; set; } = false;
    
    [Required]
    public DateTime From { get; set; }
    
    [Required]
    public DateTime To { get; set; }
}
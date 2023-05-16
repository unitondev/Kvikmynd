using System;
using System.ComponentModel.DataAnnotations;
using Kvikmynd.Domain;

namespace Kvikmynd.Application.Models;

public class CreateSubscriptionModel
{
    [Required]
    public SubscriptionType Type { get; set; }
    public bool Paid { get; set; } = false;
    [Required]
    public DateTime From { get; set; }
    [Required]
    public DateTime To { get; set; }
    [Required]
    public decimal Price { get; set; }
}
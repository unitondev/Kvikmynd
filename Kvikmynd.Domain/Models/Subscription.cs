using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Domain.Models;

public class Subscription
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int UserId { get; set; }
    [JsonIgnore]
    public virtual User User { get; set; }

    [Required]
    public SubscriptionType Type { get; set; }

    [Required]
    public bool Paid { get; set; }

    [Required]
    public DateTime From { get; set; }
    
    [Required]
    public DateTime To { get; set; }

    [Required]
    public bool Active { get; set; } = true;

    [Required]
    [Precision(6, 2)]
    public decimal Price { get; set; }
}
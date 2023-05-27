using System.ComponentModel.DataAnnotations;
using Kvikmynd.Domain;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Application.Models.Response;

public class SpecialSubscriptionOrder
{
    [Required]
    public bool Exists { get; set; }
    public SubscriptionType? Type { get; set; }
    
    [Precision(6, 2)]
    public decimal? Price { get; set; }
}
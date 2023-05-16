using System;
using System.ComponentModel.DataAnnotations;
using Kvikmynd.Domain;

namespace Kvikmynd.Application.Models.Response;

public class SubscriptionResponseModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public SubscriptionType Type { get; set; }
    public bool Paid { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public bool Active { get; set; }
    public decimal Price { get; set; }
}
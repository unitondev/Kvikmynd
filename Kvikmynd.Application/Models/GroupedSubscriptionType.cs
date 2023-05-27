using System.Collections.Generic;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Models;

public class GroupedSubscriptionType
{
    public SubscriptionType Type { get; set; }
    public int Count { get; set; }
}
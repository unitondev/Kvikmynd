using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Models.Response;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Application.Services;

public class SubscriptionService : GenericService<Subscription>, ISubscriptionService
{
    private readonly IUnitOfWork _work;
    public SubscriptionService(IRepository<Subscription> repository, IUnitOfWork work) : base(repository, work)
    {
        _work = work;
    }

    public async Task<ServiceResult<IList<SpecialSubscriptionOrder>>> GetSpecialOrderByUserIdAsync(int userId)
    {
        var groupedSubscriptionTypes = await _work.SubscriptionRepository.All()
            .Where(s => s.UserId == userId && s.Paid)
            .GroupBy(s => new { s.UserId, s.Type })
            .Select(s => new GroupedSubscriptionType{ Type = s.Key.Type, Count = s.Count() })
            .ToListAsync();
        
        IList<SpecialSubscriptionOrder> subscriptionOrders = groupedSubscriptionTypes.Select(GenerateSpecialOrder).ToList();

        return new ServiceResult<IList<SpecialSubscriptionOrder>>(subscriptionOrders);
    }

    public SpecialSubscriptionOrder GenerateSpecialOrder(GroupedSubscriptionType groupedSubscriptionType)
    {
        var subscriptionOrder = new SpecialSubscriptionOrder
        {
            Exists = false
        };
        
        // some complex logic
        if (groupedSubscriptionType.Count >= 5)
        {
            subscriptionOrder.Exists = true;
            subscriptionOrder.Type = groupedSubscriptionType.Type;
            subscriptionOrder.Price = (decimal)7.99;
        }
        
        return subscriptionOrder;
    }
}
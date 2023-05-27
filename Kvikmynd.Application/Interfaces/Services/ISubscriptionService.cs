using System.Collections.Generic;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Models.Response;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Interfaces.Services;

public interface ISubscriptionService : IService<Subscription>
{
    Task<ServiceResult<IList<SpecialSubscriptionOrder>>> GetSpecialOrderByUserIdAsync(int userId);
    SpecialSubscriptionOrder GenerateSpecialOrder(GroupedSubscriptionType groupedSubscriptionType);
}
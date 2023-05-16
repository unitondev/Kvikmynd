using AutoMapper;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Models.Response;
using Kvikmynd.Domain.Models;

namespace Kvikmynd.Application.Mapper;

public class SubscriptionProfile : Profile
{
    public SubscriptionProfile()
    {
        CreateMap<CreateSubscriptionModel, Subscription>().ReverseMap();
        CreateMap<Subscription, SubscriptionResponseModel>().ReverseMap();
        CreateMap<UpdateSubscriptionModel, Subscription>().ReverseMap();
    }
}
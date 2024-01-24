using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.Models.Response;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kvikmynd.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SubscriptionController : BaseApiController
{
    private readonly ISubscriptionService _subscriptionService;
    private readonly IMapper _mapper;

    public SubscriptionController(
        IAccountService accountService,
        ISubscriptionService subscriptionService,
        IMapper mapper
        ) : base(accountService)
    {
        _subscriptionService = subscriptionService;
        _mapper = mapper;
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetByUser()
    {
        var userId = GetUserId();
        var subscriptions = await _subscriptionService.GetAll().Where(s => s.UserId == userId)
            .OrderByDescending(s => s.To).ToListAsync();

        var returnModels = _mapper.Map<List<Subscription>, List<SubscriptionResponseModel>>(subscriptions);
        return Ok(returnModels);
    }
    
    [HttpGet("user/specialOffer")]
    public async Task<IActionResult> GetSpecialOfferByUser()
    {
        var userId = GetUserId();
        var specialOrderResult = await _subscriptionService.GetSpecialOrderByUserIdAsync(userId);
        if (!specialOrderResult.IsSucceeded)
        {
            return CustomBadRequest(specialOrderResult.Error);
        }

        return Ok(specialOrderResult);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = GetUserId();
        var subscription =
            await _subscriptionService.GetAll().FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (subscription == null)
        {
            return CustomNotFound(ErrorCode.SubscriptionNotFound);
        }

        var returnModel = _mapper.Map<Subscription, SubscriptionResponseModel>(subscription);
        return Ok(returnModel);
    }
    
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSubscriptionModel model)
    {
        var currentUserId = GetUserId();
        var createModel = _mapper.Map<CreateSubscriptionModel, Subscription>(model);
        createModel.UserId = currentUserId;
        createModel.Active = true;
        var creationResult = await _subscriptionService.CreateAsync(createModel);
        if (!creationResult.IsSucceeded)
        {
            return CustomBadRequest(ErrorCode.SubscriptionNotCreated);
        }

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateSubscriptionModel model)
    {
        var modelToUpdate = _mapper.Map<UpdateSubscriptionModel, Subscription>(model);
        var updateResult = await _subscriptionService.UpdateAsync(modelToUpdate);
        if (!updateResult.IsSucceeded)
        {
            return CustomBadRequest(ErrorCode.SubscriptionNotUpdated);
        }
        
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Cancel(int id)
    {
        var currentUserId = GetUserId();
        var subscriptionToCancel = await _subscriptionService.GetAll()
            .FirstOrDefaultAsync(s => s.Id == id && s.UserId == currentUserId);
        if (subscriptionToCancel == null)
        {
            return CustomNotFound(ErrorCode.SubscriptionNotFound);
        }

        subscriptionToCancel.Active = false;
        var updateResult = await _subscriptionService.UpdateAsync(subscriptionToCancel);
        if (!updateResult.IsSucceeded)
        {
            return CustomBadRequest(ErrorCode.SubscriptionWasNotCanceled);
        }
        
        return Ok();
    }
}
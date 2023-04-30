using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Kvikmynd.Filters;

public class HasPermissionAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
{
    private ApplicationPermission Permission { get; }

    public HasPermissionAttribute(ApplicationPermission permission)
    {
        Permission = permission;
    }


    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var roles = context.HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
        if (roles.Count == 0)
        {
            context.Result = new ForbidResult();
            return;
        }

        if (roles.Contains(Role.SystemAdmin.ToString()))
        {
            return;
        }

        var unitOfWork = context.HttpContext.RequestServices.GetService<IUnitOfWork>();
        var hasPermission = await unitOfWork.PermissionRepository.All()
            .Where(p => p.Id == Permission && p.Roles.Any(r => roles.Contains(r.Name))).AnyAsync();
        if (!hasPermission)
        {
            context.Result = new ForbidResult();
        }
    }
}
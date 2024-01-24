using Microsoft.AspNetCore.Authorization;

namespace Kvikmynd.Filters;

public class BasicAuthorizationAttribute : AuthorizeAttribute
{
    public BasicAuthorizationAttribute()
    {
        AuthenticationSchemes = "Basic";
    }
}
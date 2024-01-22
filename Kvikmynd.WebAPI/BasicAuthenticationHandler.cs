using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;

namespace Kvikmynd;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IConfiguration _configuration;

    public BasicAuthenticationHandler(IConfiguration configuration,
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock
        ) : base(options, logger, encoder, clock)
    {
        _configuration = configuration;
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey(HeaderNames.Authorization))
        {
            return Task.FromResult(AuthenticateResult.Fail("Authorization header not found"));
        }

        var authorizationHeaderString = Request.Headers.Authorization.ToString();
        if (!authorizationHeaderString.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid Authorization header"));
        }

        var decodedSecret = Encoding.UTF8.GetString(
                Convert.FromBase64String(authorizationHeaderString.Replace("Basic ", string.Empty,
                    StringComparison.OrdinalIgnoreCase)));

        var splittedSecret = decodedSecret.Split(":", count: 2);
        if (splittedSecret.Length != 2)
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid Authorization header"));
        }

        var username = splittedSecret[0];
        var password = splittedSecret[1];

        var d = _configuration.GetSection("BasicAuthentication");

        if (!string.Equals(username, _configuration["BasicAuthentication:Username"], StringComparison.OrdinalIgnoreCase) || 
            !string.Equals(password, _configuration["BasicAuthentication:Password"], StringComparison.OrdinalIgnoreCase))
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid secret"));
        }

        var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims: new List<Claim>
        {
            new(ClaimTypes.Name, username)
        }, authenticationType: "Basic"));

        return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
    }
}
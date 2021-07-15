using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Helper;

namespace MovieSite.Helper
{
    public static class ResponseHandler
    {
        public static IActionResult HandleResponseCode<T>(Result<T> response)
        {
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    return new OkObjectResult(response.Value);
                case HttpStatusCode.BadRequest:
                    return new BadRequestObjectResult(response.Message);
                case HttpStatusCode.NotFound:
                    return new NotFoundObjectResult(response.Message);
                case HttpStatusCode.InternalServerError:
                    return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                case HttpStatusCode.Unauthorized:
                    return new UnauthorizedResult();
                default:
                    return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
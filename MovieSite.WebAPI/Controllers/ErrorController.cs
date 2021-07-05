using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ErrorController : ControllerBase
    {
        //TODO replace this simple sample
        [HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public string Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context.Error;
            
            Response.StatusCode = 500;
            return exception.Message;
        }
    }
}
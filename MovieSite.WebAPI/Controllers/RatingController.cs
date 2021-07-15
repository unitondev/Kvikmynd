using Microsoft.AspNetCore.Mvc;
using MovieSite.Application.Interfaces.Services;

namespace MovieSite.Controllers
{
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }
        
        
    }
}
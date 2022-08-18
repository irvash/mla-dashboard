using ASPNETCore2JwtAuthentication.IoCConfig.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ASPNETCore2JwtAuthentication.WebApp.CustomeController;

// [ApiController]
//[AllowAnonymous]
// [ApiResultFilter]
// [Route("api/[controller]")]
[Route("api/[controller]"), EnableCors("CorsPolicy")]
public class BaseController : ControllerBase
{
    //public UserRepository UserRepository { get; set; } => property injection
    public bool UserIsAutheticated => HttpContext.User.Identity.IsAuthenticated;
    
    
    
}
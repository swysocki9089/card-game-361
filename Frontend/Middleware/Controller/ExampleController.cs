using Microsoft.AspNetCore.Mvc;

namespace MiddlewareExample.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
        [HttpGet("data")]
        public IActionResult GetData()
        {
            return Ok(new { message = "Hello from C# Middleware!" });
        }
    }
}
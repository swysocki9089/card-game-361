using Backend.Data;
using Backend.Models;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly ResultData _resultData;

        public ResultsController(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DefaultConnection");
            _resultData = new ResultData(connectionString);
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<List<iResult>> GetResults()
        {
            var results = _resultData.GetResults();
            return Ok(results);
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult InsertResult([FromBody] iResult result)
        {
            _resultData.InsertResult(result);
            return CreatedAtAction(nameof(GetResults), new { id = result.resultID }, result);
        }
    }
}
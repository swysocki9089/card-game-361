using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetsController : ControllerBase
    {
        private readonly BetData _betData;

        public BetsController(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DefaultConnection");
            _betData = new BetData(connectionString);
        }

        // GET: api/Bets
        [HttpGet]
        public ActionResult<List<iBet>> GetBets()
        {
            var results = _betData.GetBets();
            return Ok(results);
        }

        // POST: api/Bets
        [HttpPost]
        public IActionResult InsertBet([FromBody] iBet bet)
        {
            _betData.InsertBet(bet);
            return CreatedAtAction(nameof(GetBets), new { id = bet.betID }, bet);
        }
    }
}
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserData _userData;

        public UsersController(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DefaultConnection");
            _userData = new UserData(connectionString);
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            var users = _userData.GetUsers();
            return Ok(users);
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult InsertUser([FromBody] User user)
        {
            _userData.InsertUser(user);
            return CreatedAtAction(nameof(GetUsers), new { id = user.userID }, user);
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userData.DeleteUser(id);
            return NoContent();
        }

        // PATCH: api/Users/{id}/username
        [HttpPatch("{id}/username")]
        public IActionResult UpdateUsername(int id, [FromBody] string username)
        {
            _userData.UpdateUsername(id, username);
            return NoContent();
        }

        // PATCH: api/Users/{id}/password
        [HttpPatch("{id}/password")]
        public IActionResult UpdatePassword(int id, [FromBody] string passHash)
        {
            _userData.UpdatePasswordHash(id, passHash);
            return NoContent();
        }

        // PATCH: api/Users/{id}/email
        [HttpPatch("{id}/email")]
        public IActionResult UpdateEmail(int id, [FromBody] string email)
        {
            _userData.UpdateEmail(id, email);
            return NoContent();
        }
    }
}
// Controllers/MyEntitiesController.cs
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyEntitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MyEntitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MyEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyEntity>>> GetMyEntities()
        {
            return await _context.MyEntities.ToListAsync();
        }

        // GET: api/MyEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MyEntity>> GetMyEntity(int id)
        {
            var myEntity = await _context.MyEntities.FindAsync(id);

            if (myEntity == null)
            {
                return NotFound();
            }

            return myEntity;
        }

        // POST: api/MyEntities
        [HttpPost]
        public async Task<ActionResult<MyEntity>> PostMyEntity(MyEntity myEntity)
        {
            _context.MyEntities.Add(myEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMyEntity), new { id = myEntity.Id }, myEntity);
        }

        // PUT: api/MyEntities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyEntity(int id, MyEntity myEntity)
        {
            if (id != myEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(myEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.MyEntities.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/MyEntities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyEntity(int id)
        {
            var myEntity = await _context.MyEntities.FindAsync(id);
            if (myEntity == null)
            {
                return NotFound();
            }

            _context.MyEntities.Remove(myEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
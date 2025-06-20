using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EventService.Models;
using EventService.Services;

namespace EventService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _service;

        public EventController(IEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var evt = await _service.GetByIdAsync(id);
            return evt == null ? NotFound() : Ok(evt);
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> Create(Event evt) => Ok(await _service.CreateAsync(evt));

        [Authorize(Roles = "User")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Event evt)
        {
            var updated = await _service.UpdateAsync(id, evt);
            return updated == null ? NotFound() : Ok(updated);
        }

        [Authorize(Roles = "User")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            return result ? Ok() : NotFound();
        }
    }
}

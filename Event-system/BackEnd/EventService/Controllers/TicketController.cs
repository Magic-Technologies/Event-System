using Microsoft.AspNetCore.Mvc;
using EventService.Data;
using EventService.Models;

namespace EventService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly TicketRepository _repository;

        public TicketController(TicketRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllTickets()
        {
            var tickets = _repository.GetTickets();
            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public IActionResult GetTicketById(int id)
        {
            var ticket = _repository.GetTicketById(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public IActionResult CreateTicket([FromBody] Ticket ticket)
        {
            _repository.AddTicket(ticket);
            return CreatedAtAction(nameof(GetTicketById), new { id = ticket.Id }, ticket);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTicket(int id, [FromBody] Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }
            _repository.UpdateTicket(ticket);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(int id)
        {
            _repository.DeleteTicket(id);
            return NoContent();
        }
    }
} 
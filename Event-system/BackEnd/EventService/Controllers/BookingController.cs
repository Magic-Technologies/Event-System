using Microsoft.AspNetCore.Mvc;
using EventService.Data;
using EventService.Models;
using System.Collections.Generic;

namespace EventService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly BookingRepository _repository;

        public BookingController(BookingRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllBookings()
        {
            var bookings = _repository.GetBookings();
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookingById(int id)
        {
            var booking = _repository.GetBookingById(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPost]
        public IActionResult CreateBooking([FromBody] Booking booking)
        {
            _repository.AddBooking(booking);
            return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, booking);
        }




        [HttpPut("{id}")]
        public IActionResult UpdateBooking(int id, [FromBody] Booking ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }
            _repository.UpdateBooking(ticket);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(int id)
        {
            _repository.DeleteBooking(id);
            return NoContent();
        }
    }
}

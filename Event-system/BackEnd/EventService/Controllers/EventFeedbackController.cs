using Microsoft.AspNetCore.Mvc;
using EventService.Data;
using EventService.Models;

namespace EventService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventFeedbackController : ControllerBase
    {
        private readonly EventFeedbackRepository _repository;

        public EventFeedbackController(EventFeedbackRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllFeedbacks()
        {
            var feedbacks = _repository.GetFeedbacks();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public IActionResult GetFeedbackById(int id)
        {
            var feedback = _repository.GetFeedbackById(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [HttpPost]
        public IActionResult CreateFeedback([FromBody] EventFeedback feedback)
        {
            _repository.AddFeedback(feedback);
            return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.Id }, feedback);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFeedback(int id, [FromBody] EventFeedback feedback)
        {
            if (id != feedback.Id)
            {
                return BadRequest();
            }
            _repository.UpdateFeedback(feedback);
            return NoContent();
        }




        [HttpDelete("{id}")]
        public IActionResult DeleteFeedback(int id)
        {
            _repository.DeleteFeedback(id);
            return NoContent();
        }
    }
} 
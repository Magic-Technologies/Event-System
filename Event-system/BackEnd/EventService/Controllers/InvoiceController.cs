using Microsoft.AspNetCore.Mvc;
using EventService.Data;
using EventService.Models;

namespace EventService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly InvoiceRepository _repository;

        public InvoiceController(InvoiceRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllInvoices()
        {
            var invoices = _repository.GetInvoices();
            return Ok(invoices);
        }

        [HttpGet("{id}")]
        public IActionResult GetInvoiceById(int id)
        {
            var invoice = _repository.GetInvoiceById(id);
            if (invoice == null)
            {
                return NotFound();
            }
            return Ok(invoice);
        }

        [HttpPost]
        public IActionResult CreateInvoice([FromBody] Invoice invoice)
        {
            _repository.AddInvoice(invoice);
            return CreatedAtAction(nameof(GetInvoiceById), new { id = invoice.Id }, invoice);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateInvoice(int id, [FromBody] Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }
            _repository.UpdateInvoice(invoice);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteInvoice(int id)
        {
            _repository.DeleteInvoice(id);
            return NoContent();
        }
    }
} 
using EventService.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventService.Data
{
    public class TicketRepository
    {
        private readonly AppDbContext _context;

        public TicketRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Ticket> GetTickets()
        {
            return _context.Tickets.ToList();
        }

        public Ticket GetTicketById(int id)
        {
            return _context.Tickets.FirstOrDefault(t => t.Id == id);
        }

        public void AddTicket(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            _context.SaveChanges();
        }

        public void UpdateTicket(Ticket ticket)
        {
            _context.Tickets.Update(ticket);
            _context.SaveChanges();
        }

        public void DeleteTicket(int id)
        {
            var ticket = _context.Tickets.FirstOrDefault(t => t.Id == id);
            if (ticket != null)
            {
                _context.Tickets.Remove(ticket);
                _context.SaveChanges();
            }
        }
    }
} 
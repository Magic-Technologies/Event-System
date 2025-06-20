using EventService.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventService.Data
{
    public class EventFeedbackRepository
    {
        private readonly AppDbContext _context;

        public EventFeedbackRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<EventFeedback> GetFeedbacks()
        {
            return _context.EventFeedbacks.ToList();
        }

        public EventFeedback GetFeedbackById(int id)
        {
            return _context.EventFeedbacks.FirstOrDefault(f => f.Id == id);
        }

        public void AddFeedback(EventFeedback feedback)
        {
            _context.EventFeedbacks.Add(feedback);
            _context.SaveChanges();
        }

        public void UpdateFeedback(EventFeedback feedback)
        {
            _context.EventFeedbacks.Update(feedback);
            _context.SaveChanges();
        }

        public void DeleteFeedback(int id)
        {
            var feedback = _context.EventFeedbacks.FirstOrDefault(f => f.Id == id);
            if (feedback != null)
            {
                _context.EventFeedbacks.Remove(feedback);
                _context.SaveChanges();
            }
        }
    }
} 
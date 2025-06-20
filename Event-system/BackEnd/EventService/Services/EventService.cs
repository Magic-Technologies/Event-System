using EventService.Data;
using EventService.Models;
using Microsoft.EntityFrameworkCore;

namespace EventService.Services
{
    public class EventService : IEventService
    {
        private readonly AppDbContext _db;

        public EventService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Event>> GetAllAsync() => await _db.Events.ToListAsync();

        public async Task<Event?> GetByIdAsync(int id) => await _db.Events.FindAsync(id);

        public async Task<Event> CreateAsync(Event evt)
        {
            _db.Events.Add(evt);
            await _db.SaveChangesAsync();
            return evt;
        }

        public async Task<Event?> UpdateAsync(int id, Event evt)
        {
            var existing = await _db.Events.FindAsync(id);
            if (existing == null) return null;

            existing.Title = evt.Title;
            existing.Description = evt.Description;
            existing.EndTime = evt.EndTime;
            existing.StartTime = evt.StartTime;
            existing.Venue = evt.Venue;
            existing.Status = evt.Status;

            await _db.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var evt = await _db.Events.FindAsync(id);
            if (evt == null) return false;
            _db.Events.Remove(evt);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}

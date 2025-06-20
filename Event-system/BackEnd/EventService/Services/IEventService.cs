using EventService.Models;

namespace EventService.Services
{
    public interface IEventService
    {
        Task<List<Event>> GetAllAsync();
        Task<Event?> GetByIdAsync(int id);
        Task<Event> CreateAsync(Event evt);
        Task<Event?> UpdateAsync(int id, Event evt);
        Task<bool> DeleteAsync(int id);
    }
}
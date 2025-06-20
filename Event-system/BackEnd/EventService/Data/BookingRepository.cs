using EventService.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventService.Data
{
    public class BookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Booking> GetBookings()
        {
            return _context.Bookings.ToList();
        }

        public Booking GetBookingById(int id)
        {
            return _context.Bookings.FirstOrDefault(b => b.Id == id);
        }

        public void AddBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();
        }

        public void DeleteBooking(int id)
        {
            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                _context.SaveChanges();
            }
        }


        public void UpdateBooking(Booking ticket)
        {
            _context.Bookings.Update(ticket);
            _context.SaveChanges();
        }



    }
}

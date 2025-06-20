using Microsoft.EntityFrameworkCore;
using EventService.Models;

namespace EventService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Event> Events => Set<Event>();
        public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<Ticket> Tickets => Set<Ticket>();
        public DbSet<Invoice> Invoices => Set<Invoice>();
        public DbSet<EventFeedback> EventFeedbacks => Set<EventFeedback>();
        public DbSet<InvoiceTicket> InvoiceTickets => Set<InvoiceTicket>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Remove all foreign key constraints
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var foreignKeys = entityType.GetForeignKeys().ToList();
                foreach (var fk in foreignKeys)
                {
                    entityType.RemoveForeignKey(fk);
                }
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
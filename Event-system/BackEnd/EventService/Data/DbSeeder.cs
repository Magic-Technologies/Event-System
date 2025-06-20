using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventService.Models;

namespace EventService.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (context.Events.Any()) return; // Already seeded

            // Seed Events
            var events = new List<Event>
            {
                new Event
                {
                    OrganizerId = 1,
                    Title = "Tech Conference 2024",
                    Description = "A conference about the latest in tech.",
                    Category = "Technology",
                    StartTime = DateTime.UtcNow.AddDays(10),
                    EndTime = DateTime.UtcNow.AddDays(11),
                    Venue = "Convention Center",
                    Status = "upcoming",
                    CreatedAt = DateTime.UtcNow
                },
                new Event
                {
                    OrganizerId = 2,
                    Title = "Music Fest",
                    Description = "Live music from top artists.",
                    Category = "Music",
                    StartTime = DateTime.UtcNow.AddDays(20),
                    EndTime = DateTime.UtcNow.AddDays(21),
                    Venue = "Open Air Park",
                    Status = "upcoming",
                    CreatedAt = DateTime.UtcNow
                }
            };
            context.Events.AddRange(events);
            await context.SaveChangesAsync();

            // Seed Tickets
            var tickets = new List<Ticket>
            {
                new Ticket { EventId = events[0].Id, Type = "General", Price = 50, QuantityAvailable = 100 },
                new Ticket { EventId = events[0].Id, Type = "VIP", Price = 150, QuantityAvailable = 20 },
                new Ticket { EventId = events[1].Id, Type = "General", Price = 40, QuantityAvailable = 200 },
                new Ticket { EventId = events[1].Id, Type = "VIP", Price = 120, QuantityAvailable = 30 }
            };
            context.Tickets.AddRange(tickets);
            await context.SaveChangesAsync();

            // Seed Bookings
            var bookings = new List<Booking>
            {
                new Booking { EventId = events[0].Id, UserName = "alice", NumberOfTickets = 2 },
                new Booking { EventId = events[1].Id, UserName = "bob", NumberOfTickets = 3 }
            };
            context.Bookings.AddRange(bookings);
            await context.SaveChangesAsync();

            // Seed Invoices and InvoiceTickets
            var invoices = new List<Invoice>
            {
                new Invoice {
                    UserId = 1,
                    PurchaseDate = DateTime.UtcNow.AddDays(-1),
                    Status = "Unpaid",
                    BillFromName = "Event Management Co.",
                    BillFromAddress = "123 Sunset Avenue, NY, 90001",
                    BillFromEmail = "billing@eventmgmt.com",
                    BillFromPhone = "+1-800-555-1234",
                    BillToName = "Alicia Smithson",
                    BillToAddress = "789 Main Street, Beverly Hills, CA, 90210",
                    BillToEmail = "alicia.smithson@email.com",
                    BillToPhone = "+1-310-555-6789",
                    Tax = 22,
                    Fee = 5,
                    Total = 247,
                    //Tickets = new List<InvoiceTicket> {
                    //    new InvoiceTicket { Category = "Platinum", Price = 120, Qty = 1, Amount = 120 },
                    //    new InvoiceTicket { Category = "Silver", Price = 50, Qty = 2, Amount = 100 }
                    //}
                },
                new Invoice {
                    UserId = 2,
                    PurchaseDate = DateTime.UtcNow.AddDays(-2),
                    Status = "Paid",
                    BillFromName = "Event Management Co.",
                    BillFromAddress = "123 Sunset Avenue, NY, 90001",
                    BillFromEmail = "billing@eventmgmt.com",
                    BillFromPhone = "+1-800-555-1234",
                    BillToName = "Bob Marley",
                    BillToAddress = "456 Ocean Drive, Miami, FL, 33139",
                    BillToEmail = "bob.marley@email.com",
                    BillToPhone = "+1-305-555-9876",
                    Tax = 15,
                    Fee = 3,
                    Total = 168,
                    //Tickets = new List<InvoiceTicket> {
                    //    new InvoiceTicket { Category = "General", Price = 40, Qty = 3, Amount = 120 },
                    //    new InvoiceTicket { Category = "VIP", Price = 120, Qty = 1, Amount = 120 }
                    //}
                }
            };
            context.Invoices.AddRange(invoices);
            await context.SaveChangesAsync();

            // Seed Event Feedback
            var feedbacks = new List<EventFeedback>
            {
                new EventFeedback { EventId = events[0].Id, UserId = 1, Rating = 5, Comment = "Amazing event!", CreatedAt = DateTime.UtcNow },
                new EventFeedback { EventId = events[1].Id, UserId = 2, Rating = 4, Comment = "Great music!", CreatedAt = DateTime.UtcNow }
            };
            context.EventFeedbacks.AddRange(feedbacks);
            await context.SaveChangesAsync();
        }
    }
} 
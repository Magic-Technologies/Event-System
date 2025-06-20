using System.Net.Sockets;
using System;

namespace EventService.Models
{
    public class Event
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public int FeedbacksId { get; set; }
        public int OrganizerId { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? Category { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string  Venue { get; set; }
        public string Status { get; set; } = "upcoming"; // upcoming, ongoing, completed, cancelled
        

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        //[System.Text.Json.Serialization.JsonIgnore]
        //public ICollection<Ticket> Tickets { get; set; }
        //[System.Text.Json.Serialization.JsonIgnore]
        //public ICollection<EventFeedback> Feedbacks { get; set; }
    }


    public class Ticket
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int InvoiceId { get; set; }
        public string Type { get; set; } = null!; // e.g., General, VIP
        public decimal Price { get; set; }



        public int QuantityAvailable { get; set; }
        //[System.Text.Json.Serialization.JsonIgnore]
        //public Event? Event { get; set; } = null;
        //[System.Text.Json.Serialization.JsonIgnore]
        //public ICollection<Invoice>? Purchases { get; set; } = null;
    }
    public class Invoice
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Unpaid";
        public string BillFromName { get; set; }
        public string BillFromAddress { get; set; }
        public string BillFromEmail { get; set; }
        public string BillFromPhone { get; set; }
        public string BillToName { get; set; }
        public string BillToAddress { get; set; }
        public string BillToEmail { get; set; }
        public string BillToPhone { get; set; }
        public decimal Tax { get; set; }
        public decimal Fee { get; set; }
        public decimal Total { get; set; }
        //[System.Text.Json.Serialization.JsonIgnore]
        //public ICollection<InvoiceTicket> Tickets { get; set; }
    }

    public class EventFeedback
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [System.Text.Json.Serialization.JsonIgnore]
        public Event Event { get; set; }
    }

}
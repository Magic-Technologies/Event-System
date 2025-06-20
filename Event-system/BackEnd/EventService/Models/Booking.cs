namespace EventService.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        //[System.Text.Json.Serialization.JsonIgnore]
        //public Event Event { get; set; }
        public string UserName { get; set; }
        public int NumberOfTickets { get; set; }
    }
}

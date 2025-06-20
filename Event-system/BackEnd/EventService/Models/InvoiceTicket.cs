namespace EventService.Models
{
    public class InvoiceTicket
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public decimal Amount { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public Invoice Invoice { get; set; }
    }
} 
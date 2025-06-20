using EventService.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventService.Data
{
    public class InvoiceRepository
    {
        private readonly AppDbContext _context;

        public InvoiceRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<object> GetInvoices()
        {
            return _context.Invoices.Select(i => new {
                id = i.Id,
                number = $"INV{10000 + i.Id}",
                date = i.PurchaseDate.ToString("MMM dd, yyyy hh:mm tt"),
                issuedDate = i.PurchaseDate.ToString("yyyy/MM/dd, hh:mm tt"),
                dueDate = i.PurchaseDate.AddDays(4).ToString("yyyy/MM/dd, 11:59 PM"),
                //amount = i.Tickets.Sum(t => t.Amount),
                status = i.Status,
                billFrom = new {
                    name = i.BillFromName,
                    address = i.BillFromAddress,
                    email = i.BillFromEmail,
                    phone = i.BillFromPhone
                },
                billTo = new {
                    name = i.BillToName,
                    address = i.BillToAddress,
                    email = i.BillToEmail,
                    phone = i.BillToPhone
                },
                //tickets = i.Tickets.Select(t => new {
                //    category = t.Category,
                //    price = t.Price,
                //    qty = t.Qty,
                //    amount = t.Amount
                //}).ToList(),
                tax = i.Tax,
                fee = i.Fee,
                total = i.Total
            }).ToList();
        }

        public object GetInvoiceById(int id)
        {
            var i = _context.Invoices.FirstOrDefault(x => x.Id == id);
            if (i == null) return null;
            return new {
                id = i.Id,
                number = $"INV{10000 + i.Id}",
                date = i.PurchaseDate.ToString("MMM dd, yyyy hh:mm tt"),
                issuedDate = i.PurchaseDate.ToString("yyyy/MM/dd, hh:mm tt"),
                dueDate = i.PurchaseDate.AddDays(4).ToString("yyyy/MM/dd, 11:59 PM"),
                //amount = i.Tickets.Sum(t => t.Amount),
                status = i.Status,
                billFrom = new {
                    name = i.BillFromName,
                    address = i.BillFromAddress,
                    email = i.BillFromEmail,
                    phone = i.BillFromPhone
                },
                billTo = new {
                    name = i.BillToName,
                    address = i.BillToAddress,
                    email = i.BillToEmail,
                    phone = i.BillToPhone
                },
                //tickets = i.Tickets.Select(t => new {
                //    category = t.Category,
                //    price = t.Price,
                //    qty = t.Qty,
                //    amount = t.Amount
                //}).ToList(),
                tax = i.Tax,
                fee = i.Fee,
                total = i.Total
            };
        }

        public void AddInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            _context.SaveChanges();
        }

        public void UpdateInvoice(Invoice invoice)
        {
            _context.Invoices.Update(invoice);
            _context.SaveChanges();
        }

        public void DeleteInvoice(int id)
        {
            var invoice = _context.Invoices.FirstOrDefault(i => i.Id == id);
            if (invoice != null)
            {
                _context.Invoices.Remove(invoice);
                _context.SaveChanges();
            }
        }
    }
} 
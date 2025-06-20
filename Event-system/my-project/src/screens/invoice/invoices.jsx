import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import Spinner from "../../components/Spinner";

export default function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const res = await apiService.get("/invoices");
                setInvoices(res);
                if (res.length > 0) setSelectedId(res[0].id);
            } catch (err) {
                setInvoices([]);
            }
            setLoading(false);
        };
        fetchInvoices();
    }, []);

    const filtered = invoices.filter(inv =>
        inv.number?.toLowerCase().includes(search.toLowerCase())
    );
    const selectedInvoice = filtered.find(inv => inv.id === selectedId);

    return (
        <div className="flex h-full bg-gray-50">
            {/* Invoice List */}
            <div className="w-1/3 p-6 border-r bg-white flex flex-col">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search invoice"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border bg-gray-100"
                    />
                    <button className="ml-2 px-3 py-2 bg-purple-600 text-white rounded-lg">Add</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <Spinner />
                    ) : filtered.length === 0 ? (
                        <div className="text-gray-400 text-center mt-20">No invoices found</div>
                    ) : (
                        filtered.map(inv => (
                            <div
                                key={inv.id}
                                onClick={() => setSelectedId(inv.id)}
                                className={`flex items-center justify-between p-4 mb-2 rounded-lg cursor-pointer border
                  ${ selectedId === inv.id ? "border-purple-500 bg-purple-50" : "border-transparent hover:bg-gray-100" }`}
                            >
                                <div>
                                    <div className="font-semibold">{inv.number}</div>
                                    <div className="text-xs text-gray-500">{inv.date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">${inv.amount}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${ inv.status === "Paid" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700" }`}>
                                        {inv.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Invoice Details */}
            <div className="flex-1 p-8">
                {loading ? (
                    <Spinner />
                ) : selectedInvoice ? (
                    <InvoiceDetails invoice={selectedInvoice} />
                ) : (
                    <div className="text-gray-400 text-center mt-20">Select an invoice to view details</div>
                )}
            </div>
        </div>
    );
}

function InvoiceDetails({ invoice }) {
    return (
        <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-2xl font-bold text-purple-700">#{invoice.number}</div>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${ invoice.status === "Paid" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700" }`}>
                        {invoice.status}
                    </span>
                </div>
                <div className="flex flex-col text-right text-sm text-gray-500">
                    <span>Issued Date: {invoice.issuedDate}</span>
                    <span>Due Date: {invoice.dueDate}</span>
                </div>
            </div>
            <div className="flex justify-between mb-6">
                <div>
                    <div className="font-semibold">Bill From</div>
                    <div className="text-sm text-gray-600">{invoice.billFrom?.name}</div>
                    <div className="text-xs text-gray-400">{invoice.billFrom?.address}</div>
                    <div className="text-xs text-gray-400">{invoice.billFrom?.email}</div>
                    <div className="text-xs text-gray-400">{invoice.billFrom?.phone}</div>
                </div>
                <div>
                    <div className="font-semibold">Bill To</div>
                    <div className="text-sm text-gray-600">{invoice.billTo?.name}</div>
                    <div className="text-xs text-gray-400">{invoice.billTo?.address}</div>
                    <div className="text-xs text-gray-400">{invoice.billTo?.email}</div>
                    <div className="text-xs text-gray-400">{invoice.billTo?.phone}</div>
                </div>
            </div>
            <div>
                <div className="font-semibold mb-2">Ticket Details</div>
                <table className="w-full mb-4 text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th>Ticket Category</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.tickets?.map((t, idx) => (
                            <tr key={idx}>
                                <td>{t.category}</td>
                                <td>${t.price}</td>
                                <td>{t.qty}</td>
                                <td>${t.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <div className="w-1/2">
                        <div className="flex justify-between"><span>Sub Total</span><span>${invoice.amount}</span></div>
                        <div className="flex justify-between"><span>Tax (10%)</span><span>${invoice.tax}</span></div>
                        <div className="flex justify-between"><span>Fee</span><span>${invoice.fee}</span></div>
                        <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>${invoice.total}</span></div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-6">
                <button className="px-4 py-2 rounded-lg border border-gray-300">Edit Invoice</button>
                <button className="px-4 py-2 rounded-lg border border-gray-300">Send Invoice</button>
                <button className="px-4 py-2 rounded-lg border border-gray-300">Hold Invoice</button>
            </div>
        </div>
    );
}

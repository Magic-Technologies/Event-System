import React from 'react';

const InvoiceTable = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded">All</button>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded">Confirmed</button>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded">Pending</button>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded">Cancelled</button>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search name, event, etc"
                        className="px-4 py-2 border rounded"
                    />
                    <select className="px-4 py-2 border rounded">
                        <option>All Category</option>
                    </select>
                    <select className="px-4 py-2 border rounded">
                        <option>This Month</option>
                    </select>
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Invoice ID</th>
                        <th className="border border-gray-200 px-4 py-2">Date</th>
                        <th className="border border-gray-200 px-4 py-2">Name</th>
                        <th className="border border-gray-200 px-4 py-2">Event</th>
                        <th className="border border-gray-200 px-4 py-2">Ticket Category</th>
                        <th className="border border-gray-200 px-4 py-2">Price</th>
                        <th className="border border-gray-200 px-4 py-2">Qty</th>
                        <th className="border border-gray-200 px-4 py-2">Amount</th>
                        <th className="border border-gray-200 px-4 py-2">Status</th>
                        <th className="border border-gray-200 px-4 py-2">E-Voucher</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example rows */}
                    <tr>
                        <td className="border border-gray-200 px-4 py-2">INV10011</td>
                        <td className="border border-gray-200 px-4 py-2">2029/02/15</td>
                        <td className="border border-gray-200 px-4 py-2">Jackson Moore</td>
                        <td className="border border-gray-200 px-4 py-2">Symphony Under the Stars</td>
                        <td className="border border-gray-200 px-4 py-2">Diamond</td>
                        <td className="border border-gray-200 px-4 py-2">$50</td>
                        <td className="border border-gray-200 px-4 py-2">2</td>
                        <td className="border border-gray-200 px-4 py-2">$100</td>
                        <td className="border border-gray-200 px-4 py-2 text-purple-600">Confirmed</td>
                        <td className="border border-gray-200 px-4 py-2">123456-MUSIC</td>
                    </tr>
                    {/* Add more rows dynamically */}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <div>Showing 8 out of 312</div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border rounded">1</button>
                    <button className="px-4 py-2 border rounded">2</button>
                    <button className="px-4 py-2 border rounded">3</button>
                    <button className="px-4 py-2 border rounded">&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTable;

import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import Spinner from "../components/Spinner";
import EventCard from '../components/EventCard';

import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                // Fetch stats (custom endpoint or calculate from events/bookings)
                const eventsRes = await apiService.get("/api/event");
                const bookingsRes = await apiService.get("/api/booking");
                setEvents(eventsRes);
                setBookings(bookingsRes);
                setStats({
                    upcoming: eventsRes.filter(e => e.status === "upcoming" || e.status === "Active").length,
                    totalBookings: bookingsRes.length,
                    ticketsSold: bookingsRes.reduce((sum, b) => sum + (b.numberOfTickets || b.quantity || 1), 0),
                });
            } catch {
                setEvents([]);
                setBookings([]);
                setStats(null);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const ticketStats = [
        { label: "Sold Out", value: 1251, percent: 45, color: "bg-pink-500" },
        { label: "Fully Booked", value: 834, percent: 30, color: "bg-purple-500" },
        { label: "Available", value: 695, percent: 25, color: "bg-blue-500" },
    ];

    // Count bookings per event
    const bookingCounts = events.map(event => ({
        title: event.title,
        count: bookings.filter(b => b.eventId === event.id).length
    }));

    // For Chart.js bar chart:
    const chartData = {
        labels: bookingCounts.map(e => e.title),
        datasets: [
            {
                label: 'Bookings',
                data: bookingCounts.map(e => e.count),
                backgroundColor: 'rgba(99, 102, 241, 0.5)'
            }
        ]
    };

    return (
        <div className="p-6 space-y-6">
            {loading ? <Spinner /> : (
                <>
                    <BarChart
                        xAxis={[{ data: events.slice(0, 6).map(e => e.title) }]}
                        series={[
                            {
                                label: 'Bookings',
                                data: events.slice(0, 6).map(e => bookings.filter(b => b.eventId === e.id).length),
                            },
                        ]}
                        height={300}
                    />

                    <div className="grid grid-cols-3 gap-6">
                        <StatCard label="Upcoming Events" value={stats?.upcoming || 0} />
                        <StatCard label="Total Bookings" value={stats?.totalBookings || 0} />
                        <StatCard label="Tickets Sold" value={stats?.ticketsSold || 0} />
                    </div>

                    {/* <div className="bg-white rounded-2xl p-6 shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Ticket Sales</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {ticketStats.map((t, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-4 h-4 rounded-full ${ t.color }`}></div>
                                    <p className="mt-2 text-sm">{t.label}</p>
                                    <p className="font-bold">{t.value}</p>
                                    <p className="text-xs text-gray-400">{t.percent}%</p>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <h2 className="text-lg font-semibold mb-4">All Events</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {events.slice(0, 6).map((event, idx) => (
                                <EventCard key={event.id || idx} event={event} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="py-2">Booking ID</th>
                                        {/* <th className="py-2">Date</th> */}
                                        <th className="py-2">User</th>
                                        <th className="py-2">Event</th>
                                        <th className="py-2">Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.slice(0, 8).map((b, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="py-2">{b.id || b.bookingId}</td>
                                            {/* <td className="py-2">{b.date || b.createdAt || b.purchaseDate}</td> */}
                                            <td className="py-2">{b.userName || b.userId}</td>
                                            <td className="py-2">{b.eventTitle || b.event?.title || b.eventId}</td>
                                            <td className="py-2">{b.numberOfTickets || b.quantity || 1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

function StatCard({ label, value }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-md">
            <h3 className="text-gray-500 text-sm">{label}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

export default Dashboard;

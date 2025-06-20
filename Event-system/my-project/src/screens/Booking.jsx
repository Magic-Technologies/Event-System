import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Button } from '../components/button';
import { Input } from '../components/input';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import ConfirmDialog from '../components/ConfirmDialog';

export const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ eventId: '', userName: '', numberOfTickets: '' });
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('/api/Booking');
            setBookings(res);
        } catch {
            setToast({ message: 'Failed to fetch bookings', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await apiService.get('/api/Event');
            setEvents(res);
        } catch (error) {
            setToast({ message: 'Failed to fetch events', type: 'error' });
        }
    };

    useEffect(() => {
        fetchBookings();
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setForm({ eventId: '', userName: '', numberOfTickets: '' });
        setEditingId(null);
        setModalOpen(true);
    };

    const openEditModal = (booking) => {
        setForm(booking);
        setEditingId(booking.id);
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // debugger;
            if (editingId) {
                await apiService.put(`/api/Booking/${ editingId }`, form);
                setToast({ message: 'Booking updated!', type: 'success' });
            } else {
                await apiService.post('/api/Booking', form);
                setToast({ message: 'Booking added!', type: 'success' });
            }
            setModalOpen(false);
            fetchBookings();
        } catch {
            setToast({ message: 'Failed to save booking', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await apiService.delete(`/api/Booking/${ deleteId }`);
            setToast({ message: 'Booking deleted!', type: 'success' });
            fetchBookings();
        } catch {
            setToast({ message: 'Failed to delete booking', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings?.filter(b =>
        String(b.id).includes(search) ||
        b.userName.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Bookings</h2>
                <Button onClick={openAddModal}>Add Booking</Button>
            </div>
            <Input
                className="mb-4 max-w-xs"
                placeholder="Search by ID or user name"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {loading ? <Spinner /> : (
                <div className="overflow-x-auto">
                    <table className="w-full border rounded-xl">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2">ID</th><th className="p-2">Event ID</th><th className="p-2">User Name</th><th className="p-2">Tickets</th><th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((b) => (
                                <tr key={b.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{b.id}</td>
                                    <td className="p-2">{b.eventId}</td>
                                    <td className="p-2">{b.userName}</td>
                                    <td className="p-2">{b.numberOfTickets}</td>
                                    <td className="p-2">
                                        <Button variant="outline" onClick={() => openEditModal(b)}>Edit</Button>
                                        <Button variant="ghost" onClick={() => { setDeleteId(b.id); setConfirmOpen(true); }}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredBookings.length === 0 && <div className="text-center text-gray-500 py-8">No bookings found.</div>}
                </div>
            )}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Booking' : 'Add Booking'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="eventId"
                        value={form.eventId}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Select an Event</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                    <Input name="userName" placeholder="User Name" value={form.userName} onChange={handleChange} required />
                    <Input name="numberOfTickets" placeholder="Number of Tickets" type="number" value={form.numberOfTickets} onChange={handleChange} required />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (editingId ? 'Update' : 'Add')}</Button>
                    </div>
                </form>
            </Modal>
            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Delete Booking?"
                message="Are you sure you want to delete this booking? This action cannot be undone."
            />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

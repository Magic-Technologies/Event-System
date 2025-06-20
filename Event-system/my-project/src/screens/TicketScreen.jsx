import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Button } from '../components/button';
import { Input } from '../components/input';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import ConfirmDialog from '../components/ConfirmDialog';

const TicketScreen = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ type: '', price: '', quantityAvailable: '', eventId: '' });
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [events, setEvents] = useState([]);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('/api/Ticket');
            console.log(res);
            setTickets(res);
        } catch {
            setToast({ message: 'Failed to fetch tickets', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
        // Fetch events for mapping eventId to event name
        const fetchEvents = async () => {
            try {
                const res = await apiService.get('/api/Event');
                setEvents(res);
            } catch {
                setEvents([]);
            }
        };
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setForm({ type: '', price: '', quantityAvailable: '', eventId: '' });
        setEditingId(null);
        setModalOpen(true);
    };

    const openEditModal = (ticket) => {
        setForm(ticket);
        setEditingId(ticket.id);
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await apiService.put(`/api/Ticket/${ editingId }`, form);
                setToast({ message: 'Ticket updated!', type: 'success' });
            } else {
                await apiService.post('/api/Ticket', form);
                setToast({ message: 'Ticket added!', type: 'success' });
            }
            setModalOpen(false);
            fetchTickets();
        } catch {
            setToast({ message: 'Failed to save ticket', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {

            await apiService.delete(`/api/Ticket/${ deleteId }`);
            setToast({ message: 'Ticket deleted!', type: 'success' });
            fetchTickets();
        } catch {
            setToast({ message: 'Failed to delete ticket', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const filteredTickets = tickets.filter(t =>
        t.type.toLowerCase().includes(search.toLowerCase()) ||
        String(t.eventId).includes(search)
    );

    console.log(filteredTickets);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tickets</h2>
                <Button onClick={openAddModal}>Add Ticket</Button>
            </div>
            <Input
                className="mb-4 max-w-xs"
                placeholder="Search by type or event ID"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {loading ? <Spinner /> : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-xl text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-2 font-semibold">ID</th>
                                <th className="px-4 py-2 font-semibold">Type</th>
                                <th className="px-4 py-2 font-semibold">Price</th>
                                <th className="px-4 py-2 font-semibold">Quantity</th>
                                <th className="px-4 py-2 font-semibold">Event Name</th>
                                <th className="px-4 py-2 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((t) => {
                                const event = events.find(e => e.id === t.eventId);
                                return (
                                    <tr key={t.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <td className="p-3 text-center">{t.id}</td>
                                        <td className="p-3 text-center">{t.type}</td>
                                        <td className="p-3 text-center">{t.price}</td>
                                        <td className="p-3 text-center">{t.quantityAvailable}</td>
                                        <td className="p-3 text-center">{event ? event.title : t.eventId}</td>
                                        <td className="p-3 flex gap-2 justify-center">
                                            <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={() => openEditModal(t)}>Edit</Button>
                                            <Button variant="ghost" className="text-purple-600 hover:underline" onClick={() => { setDeleteId(t.id); setConfirmOpen(true); }}>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {filteredTickets.length === 0 && <div className="text-center text-gray-500 py-8">No tickets found.</div>}
                </div>
            )}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Ticket' : 'Add Ticket'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
                    <Input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
                    <Input name="quantityAvailable" placeholder="Quantity" type="number" value={form.quantityAvailable} onChange={handleChange} required />
                    <select
                        name="eventId"
                        value={form.eventId}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2 bg-gray-50"
                    >
                        <option value="">Select Event</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.title}</option>
                        ))}
                    </select>
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
                title="Delete Ticket?"
                message="Are you sure you want to delete this ticket? This action cannot be undone."
            />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default TicketScreen;
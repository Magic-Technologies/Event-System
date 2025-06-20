import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Button } from '../components/button';
import { Input } from '../components/input';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import ConfirmDialog from '../components/ConfirmDialog';

const EVENT_INITIAL_FORM = {
    title: '',
    description: '',
    category: '',
    startTime: '',
    endTime: '',
    venue: '',
    status: 'upcoming',
};
const statusOptions = ['upcoming', 'ongoing', 'completed', 'cancelled'];

const EventScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(EVENT_INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [crudModalOpen, setCrudModalOpen] = useState(false);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('/api/event');
            setEvents(res);
        } catch {
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEvents(); }, []);

    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleBookingSubmit = async (bookingData) => {
        try {
            // 1. Create booking
            const bookingRes = await apiService.post('/api/booking', {
                eventId: selectedEvent.id,
                ...bookingData,
            });
            // 2. Create invoice (auto, using booking info)
            await apiService.post('/api/invoice', {
                userId: bookingData.userId,
                tickets: [{
                    category: bookingData.ticketType,
                    price: selectedEvent.tickets.find(t => t.type === bookingData.ticketType)?.price || 0,
                    qty: bookingData.quantity,
                    amount: (selectedEvent.tickets.find(t => t.type === bookingData.ticketType)?.price || 0) * bookingData.quantity
                }],
                billToName: bookingData.name,
                billToEmail: bookingData.email,
                // Add other invoice fields as needed
            });
            setToast({ message: 'Booking and invoice created!', type: 'success' });
            setModalOpen(false);
        } catch {
            setToast({ message: 'Failed to book event.', type: 'error' });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openAddCrudModal = () => {
        setForm(EVENT_INITIAL_FORM);
        setEditingId(null);
        setCrudModalOpen(true);
    };

    const openEditCrudModal = (event) => {
        setForm({
            title: event.title || '',
            description: event.description || '',
            category: event.category || '',
            startTime: event.startTime ? event.startTime.slice(0, 16) : '',
            endTime: event.endTime ? event.endTime.slice(0, 16) : '',
            venue: event.venue || '',
            status: event.status || 'upcoming',
        });
        setEditingId(event.id);
        setCrudModalOpen(true);
    };

    const handleCrudSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...form,
            };
            if (editingId) {
                await apiService.put(`/api/Event/${ editingId }`, payload);
                setToast({ message: 'Event updated!', type: 'success' });
            } else {
                await apiService.post('/api/Event', payload);
                setToast({ message: 'Event added!', type: 'success' });
            }
            setCrudModalOpen(false);
            fetchEvents();
        } catch {
            setToast({ message: 'Failed to save event', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await apiService.delete(`/api/Event/${ deleteId }`);
            setToast({ message: 'Event deleted!', type: 'success' });
            fetchEvents();
        } catch {
            setToast({ message: 'Failed to delete event', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter(e =>
        e.title?.toLowerCase().includes(search.toLowerCase()) ||
        e.venue?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Events</h1>
                <div className="flex gap-2">
                    <Button onClick={openAddCrudModal}>Add Event</Button>
                    <input
                        type="text"
                        placeholder="Search event, location, etc."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="px-4 py-2 rounded-lg border bg-gray-100 w-80"
                    />
                </div>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-wrap gap-6 gap-y-8">
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onEdit={() => openEditCrudModal(event)}
                            onDelete={() => { setDeleteId(event.id); setConfirmOpen(true); }}
                        />
                    ))}
                </div>
            )}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Book Event">
                {selectedEvent && (
                    <BookingForm event={selectedEvent} onSubmit={handleBookingSubmit} />
                )}
            </Modal>
            <Modal open={crudModalOpen} onClose={() => setCrudModalOpen(false)} title={editingId ? 'Edit Event' : 'Add Event'}>
                <form onSubmit={handleCrudSubmit} className="space-y-4">
                    <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                    <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                    <Input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                    <Input name="startTime" type="datetime-local" placeholder="Start Time" value={form.startTime} onChange={handleChange} required />
                    <Input name="endTime" type="datetime-local" placeholder="End Time" value={form.endTime} onChange={handleChange} required />
                    <Input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} required />
                    <select name="status" value={form.status} onChange={handleChange} required className="w-full border rounded p-2">
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setCrudModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (editingId ? 'Update' : 'Add')}</Button>
                    </div>
                </form>
            </Modal>
            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Delete Event?"
                message="Are you sure you want to delete this event? This action cannot be undone."
            />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

function EventCard({ event, onEdit, onDelete }) {
    return (
        <div
            className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition relative w-[350px] max-w-full"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{event.category}</span>
                </div>
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); onEdit(); }}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); onDelete(); }}>Delete</Button>
                </div>
            </div>
            <div className="font-semibold text-lg mb-1">{event.title}</div>
            <div className="text-gray-600 mb-2 text-sm">{event.description}</div>
            <div className="text-xs text-gray-500 mb-1">
                <span>Start: {event.startTime ? new Date(event.startTime).toLocaleString() : ''}</span><br />
                <span>End: {event.endTime ? new Date(event.endTime).toLocaleString() : ''}</span>
            </div>
        </div>
    );
}

function BookingForm({ event, onSubmit }) {
    const [form, setForm] = useState({
        userId: "",
        name: "",
        email: "",
        ticketType: event.tickets?.[0]?.type || "",
        quantity: 1,
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} className="w-full border rounded p-2" required />
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" required />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" required />
            <select name="ticketType" value={form.ticketType} onChange={handleChange} className="w-full border rounded p-2">
                {event.tickets?.map((t) => (
                    <option key={t.id} value={t.type}>{t.type} (${t.price})</option>
                ))}
            </select>
            <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className="w-full border rounded p-2" required />
            <button type="submit" className="w-full bg-purple-600 text-white rounded p-2">Book Now</button>
        </form>
    );
}

export default EventScreen; 
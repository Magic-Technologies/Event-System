import React from 'react';
import { Button } from './button';

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
                    {onEdit && <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); onEdit(); }}>Edit</Button>}
                    {onDelete && <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); onDelete(); }}>Delete</Button>}
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

export default EventCard;

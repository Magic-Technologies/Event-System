import React from 'react';
import Modal from './Modal';

const ConfirmDialog = ({ open, onClose, onConfirm, title = 'Are you sure?', message = 'This action cannot be undone.' }) => (
    <Modal open={open} onClose={onClose} title={title}>
        <div className="mb-4 text-gray-700">{message}</div>
        <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
        </div>
    </Modal>
);

export default ConfirmDialog; 
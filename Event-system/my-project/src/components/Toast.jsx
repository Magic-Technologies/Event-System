import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${ type === 'success' ? 'bg-green-600' : 'bg-red-600' }`}
            role="alert">
            {message}
            <button onClick={onClose} className="ml-4 text-lg">&times;</button>
        </div>
    );
};

export default Toast; 
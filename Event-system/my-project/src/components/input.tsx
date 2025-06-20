import React from 'react';
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border border-bordergray rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-primary ${ className }`}
      {...props}
    />
  );
}

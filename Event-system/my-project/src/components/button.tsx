import React from 'react';
export function Button({ children, variant = 'default', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-medium font-sans transition-all';
  const variants = {
    default: 'bg-primary text-white hover:bg-accent',
    outline: 'border border-bordergray text-primary hover:bg-sidebar',
    ghost: 'text-primary hover:bg-sidebar',
  };
  return (
    <button className={`${ base } ${ variants[variant] } ${ className }`} {...props}>
      {children}
    </button>
  );
}

import React from 'react';
import { FiSearch, FiShoppingCart, FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Bookings', path: '/bookings' },
  { label: 'Invoices', path: '/invoices' },
  { label: 'Tickets', path: '/tickets' },
  { label: 'Events', path: '/events' },
  { label: 'Feedback', path: '/feedback' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Find the best match for the current path
  const current = menuItems.find(item =>
    item.path === location.pathname ||
    (item.path !== '/' && location.pathname.startsWith(item.path))
  );
  const title = current ? current.label : 'Dashboard';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="w-full h-[60px] flex justify-between items-center bg-white px-6 shadow font-sans">
      {/* Left: Title and subtitle */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-400">Hello Orlando, welcome back!</p>
      </div>
      {/* Right: Search + icons + profile */}
      <div className="flex items-center space-x-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything"
            className="pl-4 pr-10 py-2 rounded-full bg-white border border-bordergray text-sm w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        {/* Icons */}
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          <FiShoppingCart size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          <FiSettings size={18} />
        </button>
        {/* Logout Button */}
        <button
          className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition"
          title="Logout"
          onClick={handleLogout}
        >
          <span className="material-icons">logout</span>
        </button>
        {/* Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">Orlando Laurentius</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Mail,
  Calendar,
  Ticket,
  DollarSign,
  Folder,
  Star
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
  { label: "Bookings", icon: <CheckSquare size={18} />, path: "/bookings" },
  // { label: "Invoices", icon: <FileText size={18} />, path: "/invoices" },
  { label: "Tickets", icon: <Ticket size={18} />, path: "/tickets" },
  { label: "Events", icon: <Calendar size={18} />, path: "/events" },
  // { label: "Financials", icon: <DollarSign size={18} />, path: "/financials" },
  // { label: "Gallery", icon: <Folder size={18} />, path: "/gallery" },
  { label: "Feedback", icon: <Star size={18} />, path: "/feedback" },
];

const SidebarMenu = () => {
  return (
    <div className="w-64 h-screen bg-sidebar p-6 border-r border-bordergray font-sans shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-primary mb-6">
        <span className="text-2xl">🔻</span>
        <span>Ventixe</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition font-sans ${ isActive
                ? 'bg-primary text-white font-semibold shadow'
                : 'text-gray-700 hover:text-primary'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Try new version box (simulated) */}
      <div className="absolute bottom-8 left-6 w-52 bg-white rounded-xl shadow p-4 border border-bordergray flex flex-col items-center mt-8">
        <div className="bg-primary/10 rounded-full p-2 mb-2">
          <span className="text-primary text-2xl">📦</span>
        </div>
        <div className="text-sm text-gray-700 mb-2 text-center">Experience enhanced features and advanced interface with the latest version of Ventixe.</div>
        <button className="bg-accent text-white px-4 py-2 rounded-lg font-semibold text-sm">Try New Version</button>
      </div>
    </div>
  );
};

export default SidebarMenu;

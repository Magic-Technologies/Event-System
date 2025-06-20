// components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/sidebar/SidebarMenu';
import Navbar from '../components/NavBar';
const Layout = () => {
  return (


    <div className="grid grid-cols-[16rem_1fr] h-screen">
      {/* Sidebar */}
      <div className="bg-primary-100">
        <SidebarMenu />
      </div>

      {/* Main content: Navbar + dynamic routes */}
      <div className="grid grid-rows-[60px_1fr]">
        <div className="bg-white shadow  items-center">
          <Navbar />
        </div>
        <div className="p-4 overflow-y-auto max-h-[90vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

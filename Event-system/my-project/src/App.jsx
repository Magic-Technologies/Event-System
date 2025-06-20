import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './screens/login/Login';
import Dashboard from './screens/Dashboard';

import Signup from './screens/signUp/Signup';
import EventDashboard from './components/EventDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import PublicRoute from './components/PublicRoute';
import { Booking } from './screens/Booking';
import InvoiceScreen from './screens/invoice/invoices';
import FeedbackScreen from './screens/FeedbackScreen';
import TicketScreen from './screens/TicketScreen';
import EventScreen from './screens/EventScreen';

function App() {






  return (
    <>

      <Routes>
        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/invoices" element={<InvoiceScreen />} />
            <Route path="/feedback" element={<FeedbackScreen />} />
            <Route path="/tickets" element={<TicketScreen />} />
            <Route path="/events" element={<EventScreen />} />
            {/* <Route path="/invoices" element={<InvoiceScreen />} /> */}



            {/* Add more routes here */}
          </Route>
        </Route>

        {/* <Route element={<PublicRoute />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* </Route> */}

      </Routes>




    </>
  );
}

export default App;

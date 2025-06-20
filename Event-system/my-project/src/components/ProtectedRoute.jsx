// components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

    const token = localStorage.getItem('jwtToken');


  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

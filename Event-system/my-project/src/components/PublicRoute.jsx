import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const token = localStorage.getItem('jwtToken');

    return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

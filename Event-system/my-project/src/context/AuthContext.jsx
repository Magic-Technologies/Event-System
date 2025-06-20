// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [Token, setToken] = useState(null);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log('Stored token:', jwtToken);
        if (jwtToken) {
            setToken(jwtToken);
            console.log('Token Save');
        }
    }, []);

    const isAuthenticated = !!Token;
    console.log('isAuthenticated:', isAuthenticated);

    const login = (token) => {
        setToken(token);
        localStorage.setItem('jwtToken', token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('jwtToken');
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/apiService';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            debugger;
            console.log('Form data:', formData);
            const response = await fetch(`https://localhost:7148/api/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok && data.token) {
                apiService.setToken(data.token);
                login(data.token);
                navigate('/');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button type="submit" className="w-full bg-purple-600 text-white rounded-lg p-2.5 font-semibold hover:bg-purple-700 transition" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account yet? <Link to="/signup" className="font-medium text-purple-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;

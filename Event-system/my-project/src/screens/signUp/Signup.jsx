import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../../services/apiService';

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log('Signup component rendered');
    const handleSubmit = async (e) => {
        debugger;
        console.log('handleSubmit called');
        e.preventDefault();
        setError(null);
        setSuccess(false);
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const { confirmPassword, ...payload } = formData;

            console.log('Payload:', payload);

            const response = await fetch(`https://localhost:7148/api/Auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Create an account</h1>
                <div className="space-y-4" >
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="John Doe"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">Signup successful! Redirecting...</div>}
                    <button onClick={handleSubmit} className="w-full bg-purple-600 text-white rounded-lg p-2.5 font-semibold hover:bg-purple-700 transition" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                </div>
                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account? <Link to="/login" className="font-medium text-purple-600 hover:underline">Sign in</Link>
                </p>
            </div>
        </section>
    );
}

export default Signup;

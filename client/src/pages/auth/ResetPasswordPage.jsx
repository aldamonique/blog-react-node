import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout'; 
export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { token } = useParams(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch(`http://localhost:4000/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }

            setMessage(data.message + ' Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000); 
        
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Create a New Password">
            <form onSubmit={handleSubmit}>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <input
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </AuthLayout>
    );
}
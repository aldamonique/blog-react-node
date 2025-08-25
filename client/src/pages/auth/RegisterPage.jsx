import { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "./AuthLayout.jsx";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    const data = await response.json();

    if (response.ok) {
      setRedirect(true);
    } else {
      setError(data.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  }
  
  if (redirect) {
      return <Navigate to="/login" />;
  }
  const loginWithGoogle = () => {
      window.location.href = "http://localhost:4000/auth/google";
    };

  return (
  <AuthLayout title="Sing up Blog Art" subtitle="Think. Write. Read">
    
    <form onSubmit={register}>
      {error && <p className="error">{error}</p>}
      <input 
        type="text"
        placeholder="name"
        value={name}
        onChange={ev => setName(ev.target.value)}
        disabled={loading}
      />
      <input 
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
        disabled={loading}
      />
      <input 
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        disabled={loading}
      />
      <button disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      
      <span className="span-form">Already have an account?&nbsp;<Link className="link-form" to="/login">Login now</Link></span>
<div className="d-flex align-items-center my-3">
    <hr className="flex-grow-1 border-secondary" style={{ height: "1px" }} />
    <span className="mx-2 text-muted">OR</span>
    <hr className="flex-grow-1 border-secondary" style={{ height: "1px" }} />
  </div>
      <button className="google-login-btn" onClick={loginWithGoogle}>
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.20455C17.64 8.56682 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5618V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
        <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5618C11.2418 14.1018 10.2109 14.4205 9 14.4205C6.66 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9873 5.48182 18 9 18Z" fill="#34A853"/>
        <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29H0.957275C0.347727 8.43 0 9.69 0 11.29C0 12.89 0.347727 14.15 0.957275 15.29L3.96409 12.71V10.71Z" fill="#FBBC05"/>
        <path d="M9 3.57955C10.3218 3.57955 11.5077 4.02455 12.4405 4.92545L15.0218 2.34409C13.4673 0.891818 11.43 0 9 0C5.48182 0 2.43818 2.01273 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.66 3.57955 9 3.57955Z" fill="#EA4335"/>
      </svg> &nbsp;
        Continue with Google
      </button>            
    </form>
  </AuthLayout>
  );
}
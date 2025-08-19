import { useState } from "react";
import { Navigate } from "react-router-dom";

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

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
    </form>
  );
}
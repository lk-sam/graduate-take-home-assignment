import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });
    const data = await response.json();
    console.log(data);
    
    if (data.error) {
        console.log(data.error);
        setError(data.error);
    } else {
        setError('');
        localStorage.setItem('user_id', data.user_id);
        navigate('/');
    }
  };

  return (
    <div className='background'>
      <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label >Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
          >
            Login
          </button>
        </form>
        {error && <p className='error-message'>{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

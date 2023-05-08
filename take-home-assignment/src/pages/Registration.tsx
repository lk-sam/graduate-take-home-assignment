import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Auth.css'

const Registration= () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const naviagte = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
        });
    const data = await response.json();
    console.log(data);

    if(data.error){
        setError(data.error);
    } else {
        setError('');
        naviagte('/login');
    }

  };

  return (
    <>
    <div className="background">
      <div className='container'>
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label >Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Email:</label>
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
            Register
          </button>
        </form>
        {error && <p className='error-message'>{error}</p>}
        <p>
            Already have an account? <Link to="/login">Login </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Registration;

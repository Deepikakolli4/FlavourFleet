import React, { useState } from 'react';
import { API_URL } from '../../utilities/ApiPath';
import registerGif from './register.gif';
import './Register.css';

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log('Success:', data);
        setUsername('');
        setEmail('');
        setPassword('');
        alert('Vendor registered successfully!');
        showLoginHandler()
      } else {
        console.error('API error:', data, 'Status:', response.status);
        setError(data.message || `Registration failed: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error('Registration error:', err, err.message);
      setError(`An error occurred: ${err.message}. Please check your network or try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      <h3>
        Vendor Register{' '}
        <img src={registerGif} alt="Register animation" className="registerGif" />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        {error && <p className="error">{error}</p>}
        <div className="submit-btn-container">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
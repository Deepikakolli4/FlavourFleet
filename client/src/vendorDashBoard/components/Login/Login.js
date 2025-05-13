import React , {useState} from 'react'
import { API_URL } from '../../utilities/ApiPath';
import './Login.css'
import loginGif from './login.gif';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`${API_URL}/vendor/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });
    
          const data = await response.json();
          if (response.ok) {
            // console.log('Success:', data);
            alert('Vendor registered successfully!');
            setUsername('');
            setEmail('');
            setPassword('');
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
    <div className='loginSection'>
    <h3>Vendor Login{' '}
      <img src= {loginGif} alt='Login animation' className='loginGif' /></h3>
    <form onSubmit={handleSubmit}>
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
        <div className="submit-btn-container">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </div>
        </form>
    </div>
  )
}

export default Login
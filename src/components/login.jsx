import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import picture from "../assets/thumb-1920-918932.jpg"

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', { username, password });
      localStorage.setItem('authToken', response.data.token);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the API response
        alert(error.response.data.message);
      } else {
        // Display a generic error message
        alert('An error occurred while logging in. Please try again.');
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='image'>
        <img src={picture} alt="Background" />
      </div>
      <div className='loginform'>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='loginbtn'>
          <button onClick={handleLogin}>Login</button>
          <p> Don't have an account? <Link to="/register">Register here</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

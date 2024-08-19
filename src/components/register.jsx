import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate=useNavigate()

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/recipes', { username, password, email });
      // Handle successful registration, e.g., redirect to login page
navigate('/login')
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='loginform'>
     <h1>Sign up</h1>
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
      
      <button onClick={handleRegistration}>Register</button>
      <p>
        already have an account? <Link to="/login">login here</Link>.
      </p>
    </div>
  );
}

export default RegistrationPage;
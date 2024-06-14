import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import './Auth.css';
import { useSignUp } from '../hooks/useSignUp';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signup, loading, error} = useSignUp()

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await signup({
        username,
        email,
        password
      })
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="parent">
    <div className="auth-container md:w-[380px] md:h-auto">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn bg-[#007bff] hover:bg[#0069d9]">Sign Up</button>
        <p class="para">
          Already have an account? <Link to="/login" class="link">Login</Link>
        </p>
      </form>
      {error?<div className='border border-red-500 p-2 rounded-lg bg-[#ff483f16] text-center'>{error}</div>:<></>}
    </div>
    </div>
  );
};

export default SignUp;

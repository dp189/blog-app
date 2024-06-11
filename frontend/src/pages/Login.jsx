import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login,isLoading, error} = useLogin();

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    // Handle login logic here
    await login({
      email,
      password
    })}
    catch(error){
      console.log(error);
    }
  };

  return (

    <div className="parent">
    <div className="auth-container md:w-[380px] md:h-[400px]">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit" className="btn bg-[#007bff] hover:bg[#0069d9]">Login</button>
        <p className='para'>
          Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;

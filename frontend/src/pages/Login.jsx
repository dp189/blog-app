import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Loading from '../components/Loading/Loading';

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
    <>

    <div className="parent">
    
    <div className="auth-container md:w-[380px] md:h-auto">
    
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
        <button type="submit" className="btn bg-[#007bff] hover:bg[#0069d9]">{!isLoading ? `Login`:<div className='flex justify-center items-center'><Loading /> </div>}</button>
        <p className='para'>
          Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
        </p>
      </form>
      
      {error?<div className='border border-red-500 p-2 rounded-lg bg-[#ff483f16] text-center'>{error}</div>:<></>}
    </div>
    
    </div>
    
    </>
  );
};

export default Login;

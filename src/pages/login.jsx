import React, { useState } from 'react'
import logo from "../assets/rbu-logo.png"
import { CiLock } from "react-icons/ci";
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '@/lib/auth';
import { getUser } from '../lib/auth';

function Login(props) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getUser();
  

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = login(formData.username, formData.password);
    if (user) {
        props.onLogin(user);
      navigate("/Index");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-white flex flex-col items-center w-full max-w-md mx-auto text-black p-8 rounded-xl shadow-lg gap-6'>
        
        {/* Header */}
        <div className='flex flex-col items-center gap-2'>
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center border-2 border-blue-500">
            <img src={logo} className="rounded-full w-full h-full object-cover" />
          </div>
          <h1 className='text-2xl font-bold text-center'>Ramdeobaba University</h1>
          <h3 className='text-gray-500 text-center'>Sports Scoreboard System</h3>
          <div className='flex items-center gap-1 text-gray-600'>
            <CiLock size={18} />
            <p className='text-sm'>Administrative Login</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor="username" className='text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type="text"
              name='username'
              id='username'
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type="password"
              name='password'
              id='password'
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className='text-red-500 text-sm text-center'>{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    if (username === 'user' && password === 'password') {
      login();
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-2xl mb-4">Login</h2>
          <pre className='text-sm mb-4'>
            Username: user <br />
            Password: password
          </pre>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button type="submit" className="p-2 bg-indigo-600 text-white rounded w-full">
            Login
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

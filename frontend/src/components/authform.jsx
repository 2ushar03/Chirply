import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AuthForm = ({ darkMode }) => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === '/login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error');
        return;
      }

      if (isLogin) {
        setToken(data.token);
        navigate('/');
      } else {
        alert('Registration successful. Please login.');
        navigate('/login');
      }
    } catch {
      setError('Server error');
    }
  };

  const containerBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const labelColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  const inputBg = darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300';
  const errorColor = 'text-red-500';
  const buttonBg = darkMode ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800';
  const linkText = darkMode ? 'text-blue-400' : 'text-blue-600';

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md p-10 rounded-2xl shadow-xl transform transition-all duration-500 ${containerBg}`}>
        <h2 className={`text-3xl font-extrabold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {isLogin ? 'Welcome Back 👋' : 'Create a New Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-semibold mb-1 ${labelColor}`}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-1 ${labelColor}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              placeholder="Your password"
            />
          </div>

          {error && <p className={`${errorColor} text-sm text-center`}>{error}</p>}

          <button
            type="submit"
            className={`w-full text-white py-2 font-semibold rounded-lg transition-all duration-300 shadow-md ${buttonBg}`}
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        <div className={`text-sm text-center mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? (
            <>Don't have an account? <a href="/register" className={`${linkText} font-medium hover:underline`}>Sign up</a></>
          ) : (
            <>Already registered? <a href="/login" className={`${linkText} font-medium hover:underline`}>Sign in</a></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

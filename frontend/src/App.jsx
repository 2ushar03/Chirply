import React, { useState, useContext } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import { AuthContext, AuthProvider } from './context/authcontext';

import AuthForm from './components/authform';
import Dashboard from './components/dashboard';
import MySessions from './components/mysessions';
import SessionEditor from './components/sessioneditor';
import ProtectedRoute from './components/protectedroute';
import AdminUsersPage from './components/adminusers';

function Navbar({ darkMode, toggleDarkMode }) {
  const { token, logout, user } = useContext(AuthContext);

  const buttonBase = `font-semibold px-4 py-2 rounded shadow transition duration-200`;

  const loginBtn = darkMode
    ? `bg-blue-500 hover:bg-blue-600 text-white ${buttonBase}`
    : `bg-blue-600 hover:bg-blue-700 text-white ${buttonBase}`;

  const registerBtn = darkMode
    ? `bg-green-500 hover:bg-green-600 text-white ${buttonBase}`
    : `bg-green-600 hover:bg-green-700 text-white ${buttonBase}`;

  const logoutBtn = darkMode
    ? `bg-red-500 hover:bg-red-600 text-white ${buttonBase}`
    : `bg-red-600 hover:bg-red-700 text-white ${buttonBase}`;

  const toggleBtn = darkMode
    ? `text-gray-200 border border-gray-500 hover:bg-gray-600/30 ${buttonBase}`
    : `text-blue-600 border border-blue-400 hover:bg-blue-100 ${buttonBase}`;

  const navBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const navText = darkMode ? 'text-gray-200' : 'text-blue-600';
  const navBorder = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <nav className={`${navBg} border-b ${navBorder} px-6 py-4 shadow-sm`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`space-x-4 font-medium ${navText}`}>
          <Link to="/" className="hover:underline">Dashboard</Link>
          {token && <Link to="/my-sessions" className="hover:underline">My Sessions</Link>}
          {user?.email === 'admin@gmail.com' && (
            <Link to="/admin/users" className="hover:underline">Admin Panel</Link>
          )}
        </div>
        <div className="space-x-4 text-sm flex items-center gap-2">
          <button onClick={toggleDarkMode} className={toggleBtn}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {token ? (
            <button onClick={logout} className={logoutBtn}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={loginBtn}>Login</Link>
              <Link to="/register" className={registerBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(d => !d);
  const appBg = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900';

  return (
    <AuthProvider>
      <Router>
        <div className={`${appBg} min-h-screen transition-colors duration-300`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/login" element={<AuthForm darkMode={darkMode} />} />
            <Route path="/register" element={<AuthForm darkMode={darkMode} />} />
            <Route
              path="/my-sessions"
              element={
                <ProtectedRoute>
                  <MySessions darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-sessions/:id"
              element={
                <ProtectedRoute>
                  <SessionEditor darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsersPage darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

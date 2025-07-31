import React, { useState, useContext } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import { AuthContext, AuthProvider } from './context/authcontext';

import AuthForm from './components/authform';
import Dashboard from './components/dashboard';
import MySessions from './components/mysessions';
import SessionEditor from './components/sessioneditor';
import ProtectedRoute from './components/protectedroute';

function Navbar({ darkMode, toggleDarkMode }) {
  const { token, logout } = useContext(AuthContext);

  const navBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const navText = darkMode ? 'text-gray-200' : 'text-blue-600';
  const navBorder = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <nav className={`${navBg} border-b ${navBorder} px-6 py-4 shadow-sm`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`space-x-4 font-medium ${navText}`}>
          <Link to="/" className="hover:underline">Dashboard</Link>
          {token && <Link to="/my-sessions" className="hover:underline">My Sessions</Link>}
        </div>
        <div className="space-x-4 text-sm flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`${navText} font-semibold px-3 py-1 border rounded hover:bg-gray-500/20 transition`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {token ? (
            <button
              onClick={logout}
              className="text-red-600 hover:underline font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
              <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

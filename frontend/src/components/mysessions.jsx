import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MySessions = ({ darkMode }) => {
  const { token } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/my-sessions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setSessions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this draft session?')) return;

    try {
      const res = await fetch(`${API_URL}/my-sessions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to delete session');
        return;
      }

      setSessions((prev) => prev.filter((session) => session._id !== id));
    } catch {
      alert('Server error, please try again later.');
    }
  };

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const titleColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const linkColor = darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700';
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700';

  // Button styles
  const buttonBase =
    'inline-block px-4 py-2 rounded font-semibold transition-colors duration-200';
  const buttonStyle = darkMode
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white';

  if (loading) {
    return (
      <div className={`text-center mt-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
        My Wellness Sessions
      </h1>
      <div className="mb-6 text-right">
        <Link to="/my-sessions/new" className={`${buttonBase} ${buttonStyle}`}>
          + Create New Session
        </Link>
      </div>
      {sessions.length === 0 ? (
        <p className={textColor}>You haven’t created any sessions yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s._id}
              className={`${cardBg} p-4 rounded-md border shadow-sm flex justify-between items-center`}
            >
              <div>
                <h2 className={`text-lg font-medium ${titleColor}`}>{s.title}</h2>
                <p className={textColor}>{s.tags.join(', ')}</p>
                <span
                  className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded ${
                    s.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {s.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link to={`/my-sessions/${s._id}`} className={`${linkColor} font-semibold`}>
                  Edit
                </Link>
                {s.status !== 'published' && (
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    aria-label={`Delete session ${s.title}`}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;

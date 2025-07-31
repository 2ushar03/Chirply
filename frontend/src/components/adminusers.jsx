import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminUsersPage = ({ darkMode }) => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email !== 'admin@gmail.com') {
      navigate('/');
      return;
    }

    fetchUsers();
  }, [user, token]);

  const fetchUsers = () => {
    fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  };

  const handleDelete = async (email) => {
    if (!window.confirm(`Delete user ${email}?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/users/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to delete user');
        return;
      }

      fetchUsers();
    } catch (error) {
      alert('Server error.');
    }
  };

  const textColor = darkMode ? 'text-gray-300' : 'text-gray-800';
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const border = darkMode ? 'border-gray-700' : 'border-gray-300';
  const subtitle = darkMode ? 'text-gray-400' : 'text-gray-500';
  const buttonStyle = darkMode
    ? 'text-red-400 hover:text-red-300'
    : 'text-red-600 hover:text-red-800';

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="mb-8 text-center">
        <h1 className={`text-4xl font-bold ${textColor}`}>👑 Admin Panel</h1>
        <p className={`mt-2 text-lg ${subtitle}`}>List of all registered users</p>
      </div>

      {users.length === 0 ? (
        <p className={`${textColor} text-center`}>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow-md border p-5 ${cardBg} ${border}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`text-lg font-semibold mb-1 ${textColor}`}>{u.email}</h2>
                  <p className={`text-sm ${subtitle}`}>
                    Registered on: {new Date(u.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(u.email)}
                  className={`text-sm font-semibold ${buttonStyle}`}
                  title="Delete user"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;

import React, { useEffect, useState } from 'react';
import { FaTags, FaFileCode, FaUser } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = ({ darkMode }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/sessions`)
      .then(res => res.json())
      .then(setSessions)
      .catch(console.error);
  }, []);

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const titleColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const tagColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const linkColor = darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700';
  const uploaderColor = darkMode ? 'text-gray-400' : 'text-gray-700';

  const getUploaderName = (email) =>
    email ? email.split('@')[0] : 'Unknown';

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
        Explore Wellness Sessions
      </h1>
      {sessions.length === 0 ? (
        <div className={`text-center mt-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>No sessions available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(s => (
            <div key={s._id} className={`${cardBg} rounded-lg shadow-md border p-5 transition hover:shadow-lg`}>
              <h2 className={`text-xl font-semibold mb-1 ${titleColor}`}>{s.title}</h2>
              <p className={`mb-2 flex items-center text-sm italic ${uploaderColor}`}>
                <FaUser className="inline mr-2" />
                Uploaded by: {getUploaderName(s.uploaderEmail)}
              </p>
              <p className={`mb-3 ${tagColor}`}>
                <FaTags className="inline mr-1" /> {s.tags.join(', ')}
              </p>
              <a
                href={s.json_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkColor} font-medium`}
              >
                <FaFileCode className="inline mr-1" />
                View Source Code
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

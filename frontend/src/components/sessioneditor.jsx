import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SessionEditor = ({ darkMode }) => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [session, setSession] = useState({ title: '', tags: '', url: '' });
  const [loading, setLoading] = useState(!isNew);
  const [savedMsg, setSavedMsg] = useState('');

  const saveTimeout = useRef(null);
  const isSaving = useRef(false);

  useEffect(() => {
    if (isNew || !token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/my-sessions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Session load failed');
        return res.json();
      })
      .then(data => {
        setSession({ title: data.title, tags: data.tags.join(', '), url: data.json_file_url || '' });
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  }, [id, token, isNew]);

  useEffect(() => {
    if (!token) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      if (!isSaving.current && session.title.trim()) {
        isSaving.current = true;
        saveDraft()
          .then(() => {
            setSavedMsg('Saved');
            setTimeout(() => setSavedMsg(''), 2000);
          })
          .catch(() => {
          })
          .finally(() => {
            isSaving.current = false;
          });
      }
    }, 5000);

    return () => clearTimeout(saveTimeout.current);
  }, [session.title, session.tags, session.url]);

  const handleChange = e => setSession(s => ({ ...s, [e.target.name]: e.target.value }));

  const saveDraft = async () => {
    const payload = {
      id: isNew ? undefined : id,
      title: session.title,
      tags: session.tags.split(',').map(t => t.trim()),
      json_file_url: session.url,
    };

    const res = await fetch(`${API_URL}/my-sessions/save-draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errMsg = (await res.json()).message || 'Save draft failed';
      alert(errMsg);
      throw new Error(errMsg);
    }

    return res.json();
  };

  const handleSave = async (publish) => {
    if (!session.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      const draft = await saveDraft();

      if (publish || draft.status === 'published') {
        const pubRes = await fetch(`${API_URL}/my-sessions/publish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ id: draft._id }),
        });

        if (!pubRes.ok) {
          const errMsg = (await pubRes.json()).message || 'Publish failed';
          alert(errMsg);
          throw new Error(errMsg);
        }
      }

      if (publish) {
        alert('Published successfully');
        navigate('/my-sessions');
      } else {
        setSavedMsg('Saved');
        setTimeout(() => setSavedMsg(''), 2000);
      }
    } catch (err) {
      // errors handled by alerts above
    }
  };

  const btnStyle = darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700';

  if (loading)
    return <div className={`text-center mt-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</div>;

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        {isNew ? 'Create New Session' : 'Edit Session'}
      </h1>
      <form onSubmit={e => { e.preventDefault(); handleSave(false); }} className="space-y-5">
        <div>
          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
          <input
            name="title"
            placeholder="Session title"
            value={session.title}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        </div>
        <div>
          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tags (comma separated)</label>
          <input
            name="tags"
            placeholder="tag1, tag2"
            value={session.tags}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        </div>
        <div>
          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>JSON File URL</label>
          <input
            name="url"
            placeholder="https://example.com/session.json"
            value={session.url}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        </div>

        <button type="submit" className={`w-full py-2 rounded text-white font-semibold transition ${btnStyle}`}>
          {isNew ? 'Save Draft' : 'Save Draft'}
        </button>
      </form>

      {savedMsg && (
        <p className={`mt-2 text-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
          {savedMsg}
        </p>
      )}

      {!isNew && (
        <button
          onClick={() => handleSave(true)}
          className={`w-full mt-3 py-2 rounded text-white font-semibold transition ${btnStyle}`}
        >
          Publish Session
        </button>
      )}
    </div>
  );
};

export default SessionEditor;

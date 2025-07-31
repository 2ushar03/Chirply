<body>

  <h1>🧘 Chirply – Wellness Session Manager</h1>
  <a href="https://thinkpublish.vercel.app/"/>
  <p>A full-stack web app that allows users to register, log in, and manage their wellness sessions like yoga or meditation flows.</p>

  <h2>🌐 Live Demo</h2>
  <ul>
    <li><strong>Frontend:</strong> <a href="https://chirply-frontend.vercel.app" target="_blank">Vercel</a></li>
    <li><strong>Backend:</strong> <a href="https://chirply.onrender.com" target="_blank">Render</a></li>
  </ul>

  <h2>🧰 Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js, Tailwind CSS, Vite</li>
    <li><strong>Backend:</strong> Node.js, Express.js, MongoDB (Mongoose)</li>
    <li><strong>Auth:</strong> JWT</li>
    <li><strong>Deployment:</strong> Vercel (frontend), Render (backend)</li>
  </ul>

  <h2>🚀 Features</h2>
  <ul>
    <li>User Registration and Login with JWT authentication</li>
    <li>Session creation: title, tags, JSON URL</li>
    <li>Save Draft and Publish options</li>
    <li>Auto-save on 5s inactivity and every 30s interval</li>
    <li>Visual feedback when draft is auto-saved (e.g., “Saved ✅”)</li>
    <li>Dashboard to view and edit user’s own sessions</li>
    <li>Public route to view all published sessions</li>
    <li>Protected routes for session management</li>
    <li>MongoDB schema for users and sessions</li>
    <li>Error handling for failed saves or fetches</li>
    <li>Responsive UI with dark mode support</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre>
/frontend
  ├── src
  │   ├── pages/
  │   ├── components/
  │   ├── context/
  │   └── App.jsx
  └── .env

/backend
  ├── routes/
  ├── models/
  ├── controllers/
  └── server.js
  └── .env
  </pre>

  <h2>🔧 Setup Instructions</h2>
  <h3>Frontend</h3>
  <pre>
cd frontend
npm install
npm run dev
  </pre>

  <h3>Backend</h3>
  <pre>
cd backend
npm install
npm start
  </pre>

  <h3>.env Example</h3>
  <p><strong>Backend (.env):</strong></p>
  <pre>
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
  </pre>

  <p><strong>Frontend (.env):</strong></p>
  <pre>
VITE_API_URL=http://localhost:5000/api
  </pre>

  <h2>📝 Notes</h2>
  <ul>
    <li>All sessions are auto-saved after 5 seconds of inactivity or every 30 seconds</li>
    <li>Drafts and published sessions are clearly marked in the dashboard</li>
    <li>.env files are used but not included in version control</li>
  </ul>

</body>

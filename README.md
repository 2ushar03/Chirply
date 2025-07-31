body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 2rem;
      line-height: 1.6;
      max-width: 900px;
      color: #222;
    }
    h1, h2 {
      color: #1f4e79;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4px;
    }
    h3 {
      color: #2c3e50;
    }
    code, pre {
      background-color: #f4f4f4;
      border-radius: 5px;
      padding: 0.5rem;
      font-family: Consolas, monospace;
    }
    a {
      color: #007acc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      margin: 0.5rem 0 1rem 1.5rem;
    }
  </style>
</head>
<body>

  <h1>Chirply 🐦</h1>
  <p><strong>Chirply</strong> is a full-stack MERN-based web platform to create, edit, auto-save, and publish technical sessions or articles. It supports draft mode, tagging, and secure session management, optimized for tech content delivery.</p>

  <!-- Features -->
  <h2>🔧 Features</h2>
  <ul>
    <li>JWT-based user authentication</li>
    <li>Create, edit, and auto-save drafts (after 5 seconds of inactivity)</li>
    <li>Publish and manage sessions with tags</li>
    <li>View all public sessions</li>
    <li>Dark mode support</li>
  </ul>

  <!-- Tech Stack -->
  <h2>🧱 Tech Stack</h2>

  <h3>Frontend</h3>
  <ul>
    <li>React.js (Vite)</li>
    <li>Tailwind CSS</li>
    <li>React Router</li>
    <li>Context API for Auth</li>
  </ul>

  <h3>Backend</h3>
  <ul>
    <li>Node.js, Express.js</li>
    <li>MongoDB + Mongoose</li>
    <li>JWT for authentication</li>
    <li>dotenv for environment variables</li>
  </ul>

  <!-- Folder Structure -->
  <h2>📁 Folder Structure</h2>
  <pre><code>.
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
</code></pre>

  <!-- Setup Instructions -->
  <h2>⚙️ Setup</h2>

  <h3>1. Environment Variables</h3>
  <p>Create two <code>.env</code> files:</p>

  <h4>📄 backend/.env</h4>
  <pre><code>
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
</code></pre>

  <h4>📄 frontend/.env</h4>
  <pre><code>
VITE_API_URL=https://your-api-url/api
</code></pre>

  <h3>2. Installation</h3>
  <pre><code>
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
</code></pre>

  <h3>3. Running Locally</h3>
  <pre><code>
# Start backend server
cd backend
node server.js

# Start frontend
cd frontend
npm run dev
</code></pre>

  <!-- Deployment Info -->
  <h2>🌐 Deployment</h2>
  <ul>
    <li><strong>Backend:</strong> Hosted on <a href="https://render.com" target="_blank">Render</a></li>
    <li><strong>Frontend:</strong> Hosted on <a href="https://vercel.com" target="_blank">Vercel</a></li>
  </ul>

  <!-- Notes -->
  <h2>💡 Auto-Save Feature</h2>
  <p>Sessions are automatically saved as a draft 5 seconds after user stops typing — helping ensure no data loss during editing.</p>

  <!-- Author Info -->
  <h2>👨‍💻 Author</h2>
  <p>
    <strong>Tushar Patil</strong><br>
    Pune, India<br>
    <a href="https://github.com/2ushar03" target="_blank">GitHub</a> |
    <a href="https://linkedin.com/in/tushar" target="_blank">LinkedIn</a>
  </p>

  <!-- License -->
  <h2>📝 License</h2>
  <p>MIT License. Use it, fork it, and improve it freely.</p>

</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Chirply - Project Documentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 2rem;
      max-width: 900px;
      color: #333;
    }
    h1, h2, h3 {
      color: #0056b3;
    }
    code {
      background: #f4f4f4;
      padding: 2px 5px;
      border-radius: 4px;
      font-family: monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
    }
    a {
      color: #007acc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      margin-top: 0;
    }
  </style>
</head>
<body>
  <h1>Chirply 🐦</h1>
  <p>
    Chirply is a full-stack MERN (MongoDB, Express, React, Node.js) web application for managing and publishing interactive sessions or articles. Users can create, edit, save drafts, and publish sessions with ease. It features secure authentication, role-based session management, and a streamlined user interface.
  </p>

  <h2>🚀 Features</h2>
  <ul>
    <li>User Authentication (JWT-based)</li>
    <li>Create and Edit Sessions</li>
    <li>Auto-Save Drafts after 5 seconds of inactivity</li>
    <li>Publish Completed Sessions</li>
    <li>View Publicly Published Sessions</li>
    <li>JSON File URL support for session data</li>
    <li>Author information on each published session</li>
    <li>Light/Dark Mode toggle</li>
    <li>Protected routes via middleware</li>
  </ul>

  <h2>🛠️ Tech Stack</h2>
  <h3>Frontend</h3>
  <ul>
    <li>React.js</li>
    <li>Tailwind CSS</li>
    <li>React Router</li>
    <li>Context API for Auth</li>
  </ul>

  <h3>Backend</h3>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB + Mongoose</li>
    <li>JSON Web Tokens (JWT)</li>
    <li>bcryptjs for password hashing</li>
    <li>dotenv for environment config</li>
  </ul>

  <h2>📁 Folder Structure</h2>
  <pre><code>.
├── backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
└── frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
</code></pre>

  <h2>⚙️ Setup Instructions</h2>
  <h3>🔐 Environment Variables</h3>
  <p>Create <code>.env</code> files in both frontend and backend directories.</p>

  <h4>backend/.env</h4>
  <pre><code>PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
</code></pre>

  <h4>frontend/.env</h4>
  <pre><code>VITE_API_URL=https://your-backend-api.onrender.com/api
</code></pre>

  <h3>📦 Install Dependencies</h3>
  <pre><code># Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
</code></pre>

  <h3>▶️ Run Locally</h3>
  <pre><code># Start backend
cd backend
node server.js

# Start frontend
cd ../frontend
npm run dev
</code></pre>

  <h2>🧠 Auto-Save Drafts</h2>
  <p>The editor page is equipped with an <strong>auto-save</strong> feature that saves your draft 5 seconds after you stop typing. No need to worry about losing progress!</p>

  <h2>🌍 Deployment</h2>
  <ul>
    <li><strong>Frontend:</strong> Deployed on <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a></li>
    <li><strong>Backend:</strong> Deployed on <a href="https://render.com/" target="_blank" rel="noopener noreferrer">Render</a></li>
  </ul>

  <h2>📸 Screenshots</h2>
  <p><em>Add relevant screenshots or screen recordings here to illustrate the UI and experience.</em></p>

  <h2>🧑‍💻 Author</h2>
  <p>
    <strong>Tushar Patil</strong><br />
    📍 Pune, India<br />
    📫 <a href="https://linkedin.com/in/tushar" target="_blank" rel="noopener noreferrer">LinkedIn</a> — <a href="https://github.com/2ushar03" target="_blank" rel="noopener noreferrer">GitHub</a>
  </p>

  <h2>📄 License</h2>
  <p>This project is licensed under the MIT License.</p>
</body>
</html>

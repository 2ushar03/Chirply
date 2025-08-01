<body>

  <h1>🧘 ThinkPublish – Wellness Session Manager</h1>
  <p>A full-stack web app for managing personal wellness sessions. Users can create, edit, auto-save, and publish their wellness flows.</p>

  <h2>🌐 Live Demo</h2>
  <ul>
    <h1><strong>Deployed Project:</strong> <a href="https://thinkpublish.vercel.app" target="_blank">thinkpublish.vercel.app</a></h1>
  </ul>

  <h2>🧰 Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js (Vite), Tailwind CSS</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB (Mongoose)</li>
    <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
    <li><strong>Deployment:</strong> Vercel (frontend), Render (backend)</li>
  </ul>

  <h2>🚀 Features</h2>
  <ul>
    <li>User registration and login with secure JWT-based authentication</li>
    <li>Create new wellness sessions with title, tags, and JSON URL</li>
    <li>Auto-save sessions after 5 seconds of inactivity or every 30 seconds</li>
    <li>Save as draft or publish sessions</li>
    <li>View, edit, and delete saved sessions in the dashboard</li>
    <li>Visual feedback (e.g., “Saved ✅”) after successful auto-save</li>
    <li>Protected API routes to ensure user-level access</li>
    <li>Responsive and clean user interface with full dark mode support</li>
    <li>🔥 Admin panel to manage registered users and delete published sessions</li>
    <li>Admin-only controls (only <code>admin@gmail.com</code> can access)</li>
    <li>Ability to delete any published session as admin</li>
    <li>Ability to delete any user (except admin) from the admin panel</li>
    <li>Stylized login/register/logout buttons that adapt to dark/light mode</li>
    <li>Frontend and backend auto-deployed via Vercel and Render respectively</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre>
/frontend
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── context/
  │   └── App.jsx
  └── .env

/backend
  ├── routes/
  ├── models/
  ├── middleware/
  ├── controllers/
  ├── server.js
  └── .env
  </pre>

  <h2>🛠️ Setup Instructions</h2>

  <h3>1. Frontend</h3>
  <pre>
cd frontend
npm install
npm run dev
  </pre>

  <h3>2. Backend</h3>
  <pre>
cd backend
npm install
npm start
  </pre>

  <h3>3. Environment Variables</h3>
  <p><strong>Frontend (.env)</strong></p>
  <pre>
VITE_API_URL=http://localhost:5000/api
  </pre>

  <p><strong>Backend (.env)</strong></p>
  <pre>
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
  </pre>

  <h2>📎 Notes</h2>
  <ul>
    <li>Ensure MongoDB is running locally or use a cloud DB URI (MongoDB Atlas works great)</li>
    <li>Auto-save triggers both after 5 seconds of inactivity and every 30 seconds</li>
    <li>Dark mode is fully supported across all pages and components</li>
    <li>.env files are used to store sensitive credentials and are not pushed to GitHub</li>
    <li>Only <code>admin@gmail.com</code> has access to the Admin Panel</li>
    <li>Admin account is protected from deletion</li>
  </ul>

</body>

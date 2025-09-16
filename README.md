# 🎬 MERN Netflix Clone

A **full-stack Netflix-inspired application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can **browse, search for movies & TV shows, view details, watch trailers, and manage search history**, with **JWT-based authentication** for secure access.

🔗 **Live Demo:** [Netflix Clone](https://mern-stack-netflix.onrender.com/)

---

## ⚡ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JSON Web Token (JWT)  

---

## ✨ Features

- ✅ User Authentication – Secure login/signup using JWT  
- ✅ Browse Movies & TV Shows – Fetch trending and popular content  
- ✅ Search Functionality – Find movies, TV shows, and actors  
- ✅ Watch Trailers – Embedded YouTube trailers  
- ✅ Search History – Store and view search history  
- ✅ Get Similar Recommendations – Related movies & shows  
- ✅ Responsive UI – Optimized for all screen sizes  

---

## 📂 Folder Structure

```
mern-netflix/
├── Frontend/                # Frontend (React)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages (Home, Login, Browse, Search)
│   │   ├── utils/         # API helpers, hooks
│   │   ├── App.jsx        # Main app entry
│   │   └── main.jsx       # React root
│   └── package.json
│
├── backend/                # Backend (Express + Node.js)
│   ├── config/            # DB connection, keys
│   ├── controllers/       # Route handlers
│   ├── middleware/        # JWT auth, error handling
│   ├── models/            # Mongoose schemas (User, History)
│   ├── routes/            # API endpoints (auth, search, movies)
│   ├── utils/             # Helper functions
│   ├── server.js          # Backend entry point
│   └── package.json
│
├── .env.example           # Environment variables template
├── README.md              # Project documentation
└── package.json           # Root config (optional)
```

---

## 🚀 Quickstart

### 1. Clone the repo
```bash
git clone <repo-url>
cd mern-netflix
```

### 2. Install dependencies
```bash
# Backend
cd server && npm install

# Frontend
cd client && npm install
```

### 3. Setup environment variables
Create `.env` inside `server/`:

```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
TMDB_API_KEY=your-tmdb-api-key
```

### 4. Run the app
```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm start
```

Open 👉 http://localhost:3000

---

## 📦 Deployment

- **Backend:** Render / Railway / Heroku  
- **Frontend:** Vercel / Netlify  
- **Database:** MongoDB Atlas  

---

## 📜 License

MIT

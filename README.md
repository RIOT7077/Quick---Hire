# 💼 Job Portal – MERN Stack

A full-stack Job Portal web application built using the **MERN Stack** that allows users to search and apply for jobs while recruiters can post and manage job listings.

---

# 🚀 Features

## 👨‍💼 User Features
- User Registration & Login
- JWT Authentication
- Browse Available Jobs
- Search & Filter Jobs
- Apply for Jobs
- View Applied Jobs
- Update Profile

## 🏢 Recruiter Features
- Recruiter Registration & Login
- Post New Jobs
- Edit/Delete Jobs
- View Applicants
- Manage Job Listings

## 🔐 Security Features
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Redux Toolkit / Context API
- Tailwind CSS / Bootstrap / CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcrypt.js

---

# 📁 Project Structure

```bash
job-portal/
│
├── client/                 # Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── services/
│       └── App.js
│
├── server/                 # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup
---

## 2️⃣ Install Dependencies

### Frontend

```bash
cd Frontend
npm install
```

### Backend

```bash
cd Backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

---

# ▶️ Run the Application

## Start Backend Server

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm start
```

# 🌟 Future Improvements

- Resume Upload using Cloudinary
- Email Verification
- Password Reset
- Real-time Notifications
- AI-based Job Recommendations
- Admin Analytics Dashboard

---

# ☁️ Deployment

## Frontend
- Vercel
- Netlify

## Backend
- Render
- Railway

## Database
- MongoDB Atlas

---

# 🤝 Contributing

Contributions are welcome!

### Steps to Contribute

```bash
# Fork the repository

# Create a new branch
git checkout -b feature-name

# Commit changes
git commit -m "Added new feature"

# Push to GitHub
git push origin feature-name
```

Then create a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Karan Kale**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!

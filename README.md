# 📚 AI Study App

An intelligent full-stack web application that helps students upload, manage, and interact with their study materials efficiently.

---

## 🚀 Features

* 🔐 **Authentication System**

  * Secure login & signup using JWT

* 📂 **Upload Notes**

  * Upload PDFs, images, and documents
  * Files stored on server using Multer

* 📊 **Dynamic Dashboard**

  * Total notes count
  * Recent uploads (real-time data)

* 🧾 **Notes Management**

  * View uploaded notes
  * Organized by subject

* ⚡ **Fast & Responsive UI**

  * Clean and modern interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer (file upload)

---

## 📁 Project Structure

```
Study_Ai/
│
├── client/      # Frontend (React)
├── server/      # Backend (Node + Express)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/ai-study-app.git
cd ai-study-app
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create a `.env` file inside `server/`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start server:

```
npm run dev
```

---

### 3. Setup Frontend

```
cd client
npm install
npm start
```

---

## 🌐 API Endpoints

### Notes

* `POST /api/notes/upload` → Upload note
* `GET /api/notes` → Get user notes

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

---

## 📌 Future Enhancements

* 🤖 AI-based note summarization
* 💬 Chat with uploaded notes
* 🧠 Quiz generation from notes
* ☁️ Cloud storage integration
* 📱 Mobile responsive improvements

---

## 🧑‍💻 Author

**Arvind Shukla**

---


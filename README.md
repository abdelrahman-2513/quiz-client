# Student Portal Frontend

## 📌 Project Overview
This is the frontend of the **Student Portal**, a web-based application where students and teachers can manage quizzes, announcements, and courses. The application ensures **role-based access control** and provides **real-time quiz participation** with timers and result tracking.

## 🚀 Technologies Used
- **React.js** (with TypeScript)
- **Redux Toolkit** (for state management)
- **Material UI** (for UI components and styling)
- **React Router** (for navigation)
- **React Query** (for API state management)
- **Axios** (for API requests)

## 🎯 Features Implemented
### 🔑 **Authentication System**
- Login with token-based authentication.
- Role-based access (Admin, Teacher, Student).
- User state is managed via Redux.

### 📌 **Dashboard**
- Displays quizzes and announcements.
- **Responsive layout** (flex row on desktop, flex column on mobile).
- Sidebar navigation with active state highlighting.

### 📝 **Quizzes Management**
- Teachers can **create, edit, and delete quizzes**.
- Students can **take quizzes with a timer**.
- Supports **multiple-choice questions** with answer validation.
- Fetches **quiz results** for each student and displays scores.

### 📢 **Announcements Management**
- Teachers can **post, update, and delete announcements**.
- Announcements are displayed on the **dashboard**.

### 🎓 **Courses Management**
- Teachers can **assign students to courses**.
- Users are fetched dynamically from the API.

### 📊 **Responsive Design**
- Uses **Material UI** for a modern look and feel.
- Optimized layout for **desktop and mobile screens**.

## 📂 Project Structure
```
📂 src/
 ├── components/  # Reusable UI components
 ├── pages/       # Main application pages
 ├── redux/       # Redux store & slices
 ├── apis/        # API handlers with Axios
 ├── customHooks/ # Custom hooks for React Query
 ├── utils/       # Helper functions
```

## 🚀 **Getting Started**
### 1️⃣ Install dependencies:
```sh
npm install
```

### 2️⃣ Start the development server:
```sh
npm start
```

## 📌 Future Enhancements
- **Real-time notifications for new announcements.**
- **User profile management with avatar uploads.**
- **Dark mode toggle.**

---

This frontend is built for scalability, performance, and user experience. Let me know if you need any further refinements! 


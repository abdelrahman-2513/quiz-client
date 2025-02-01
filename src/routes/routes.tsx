import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import RequireAuth from "../auth/RequireAuth";
import LoginPage from "../pages/Login";
import AnnouncementPage from "../pages/AnnouncementPage";
import QuizzesPage from "../pages/QuizzesPage";
import CoursesPage from "../pages/CoursesPage";
import TakeQuiz from "../pages/QuizPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<RequireAuth Component={Dashboard} />} />
      
      <Route path="/announcement" element={<RequireAuth Component={AnnouncementPage} />} />
      <Route path="/quiz" element={<RequireAuth Component={QuizzesPage} />} />
      <Route path="/course" element={<RequireAuth Component={CoursesPage} />} />
      <Route path="/student/quizzes/:id" element={<RequireAuth Component={TakeQuiz} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

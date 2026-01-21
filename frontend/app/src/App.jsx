import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// Layout & Unified Login
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";

// Auth
import ForgetPassword from "./pages/ForgetPassword"; 
import Register from "./pages/Register";

// ================= ADMIN IMPORTS =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminAddUser from "./pages/admin/AdminAddUser";

// Admin: Students
import AdminStudentDashboard from "./pages/admin/AdminStudentDashboard";

// ================= STUDENT IMPORTS =================
import StudentDashboard from "./pages/students/Dashboard";
import StudentProfile from "./pages/students/Profile";
import StudentSubjects from "./pages/students/Subjects";
import StudentSchedule from "./pages/students/Schedule";
import StudentAttendance from "./pages/students/Attendance";


// ================= TEACHER IMPORTS =================
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherStudentList from "./pages/teacher/TeacherStudentList";
import TeacherEvaluateStudent from "./pages/teacher/TeacherEvaluateStudent";
import TeacherStudentAttendance from "./pages/teacher/TeacherStudentAttendance";

const App = () => {
 
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

         {/* GLOBAL AUTH ROUTES */}
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} /> 
        
        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin" element={<MainLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
           <Route path="add-user" element={<AdminAddUser />} />
          {/* Admin: Student Management */}
          <Route path="students" element={<AdminStudentDashboard />} />
          </Route>

        {/* --- STUDENT ROUTES --- */}
        <Route path="/student" element={<MainLayout role="student" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="subjects" element={<StudentSubjects />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="attendance" element={<StudentAttendance />} />
        </Route>

        {/* --- TEACHER ROUTES --- */}
        <Route path="/teacher" element={<MainLayout role="teacher" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="student-list" element={<TeacherStudentList />} />
          <Route path="evaluate" element={<TeacherEvaluateStudent />} />
          <Route path="student-attendance" element={<TeacherStudentAttendance />} />
        </Route>
         </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App

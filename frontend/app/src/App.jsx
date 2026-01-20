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

// ================= STUDENT IMPORTS =================
import StudentDashboard from "./pages/students/Dashboard";

// ================= TEACHER IMPORTS =================
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

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
          </Route>

        {/* --- STUDENT ROUTES --- */}
        <Route path="/student" element={<MainLayout role="student" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        {/* --- TEACHER ROUTES --- */}
        <Route path="/teacher" element={<MainLayout role="teacher" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
        </Route>
         </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App

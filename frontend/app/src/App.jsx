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
import AdminAddStudent from "./pages/admin/AdminAddStudent";
import AdminStudentList from "./pages/admin/AdminStudentList";
import AdminStudentAttendance from "./pages/admin/AdminStudentAttendance";

//Admin: Teachers
import AdminTeacherDashboard from "./pages/admin/AdminTeacherDashboard";
import AdminTeachersList from "./pages/admin/AdminTeachersList";
import AdminAddTeacher from "./pages/admin/AdminAddTeacher";

// Admin: Courses & Subjects
import AdminCourseList from "./pages/admin/AdminCourseList";

// Admin: Management & Finances
import AdminManageNotices from "./pages/admin/AdminManageNotices";

import AdminSubjectDashboard from "./pages/admin/AdminSubjectDashboard";

// ================= STUDENT IMPORTS =================
import StudentDashboard from "./pages/students/Dashboard";
import StudentProfile from "./pages/students/Profile";
import StudentSubjects from "./pages/students/Subjects";
import StudentSchedule from "./pages/students/Schedule";
import StudentAttendance from "./pages/students/Attendance";
import StudentMarks from "./pages/students/Marks";

// ================= TEACHER IMPORTS =================
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherStudentList from "./pages/teacher/TeacherStudentList";
import TeacherEvaluateStudent from "./pages/teacher/TeacherEvaluateStudent";
import TeacherStudentAttendance from "./pages/teacher/TeacherStudentAttendance";
import TeacherSubjects from "./pages/teacher/TeacherSubjects";
import TeacherSchedule from "./pages/teacher/TeacherSchedule";
import TeacherNotices from "./pages/teacher/TeacherNotices";

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
          <Route path="students/add" element={<AdminAddStudent />} />
          <Route path="students/list" element={<AdminStudentList />} />
          <Route path="students/attendance" element={<AdminStudentAttendance />} />
          
          {/* Admin: Teacher Management */}
          <Route path="teachers" element={<AdminTeacherDashboard />} />
          <Route path="teachers/list" element={<AdminTeachersList />} />
          <Route path="teachers/add" element={<AdminAddTeacher />} />

          {/* Admin: Academic - Courses */}
          <Route path="courses" element={<AdminCourseList />} />

          {/* Admin: Academic - Subjects */}
          <Route path="subjects" element={<AdminSubjectDashboard />} />

          {/* Admin: Management */}
          <Route path="notices" element={<AdminManageNotices />} /> 
          
          </Route>
          

        {/* --- STUDENT ROUTES --- */}
        <Route path="/student" element={<MainLayout role="student" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="subjects" element={<StudentSubjects />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="marks" element={<StudentMarks />} />
        </Route>

        {/* --- TEACHER ROUTES --- */}
        <Route path="/teacher" element={<MainLayout role="teacher" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="student-list" element={<TeacherStudentList />} />
          <Route path="evaluate" element={<TeacherEvaluateStudent />} />
          <Route path="student-attendance" element={<TeacherStudentAttendance />} />
          <Route path="mysubjects" element={<TeacherSubjects />} />
          <Route path="schedule" element={<TeacherSchedule />} />
          <Route path="notices" element={<TeacherNotices />} />
        </Route>
         </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App

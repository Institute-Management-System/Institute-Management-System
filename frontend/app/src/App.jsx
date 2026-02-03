import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// Layout & Auth
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";

// ================= ADMIN =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminAddUser from "./pages/admin/AdminAddUser";
import AdminStudentDashboard from "./pages/admin/AdminStudentDashboard";
import AdminAddStudent from "./pages/admin/AdminAddStudent";
import AdminStudentList from "./pages/admin/AdminStudentList";
import AdminStudentAttendance from "./pages/admin/AdminStudentAttendance";
import AdminStudentMarks from "./pages/admin/AdminStudentMarks";
import AdminViewStudentMarks from "./pages/admin/AdminViewStudentMarks";
import AdminStudentFees from "./pages/admin/AdminStudentFees";
import AdminTeacherDashboard from "./pages/admin/AdminTeacherDashboard";
import AdminAddTeacher from "./pages/admin/AdminAddTeacher";
import AdminTeachersList from "./pages/admin/AdminTeachersList";
import AdminTeacherAttendance from "./pages/admin/AdminTeacherAttendance";
import AdminCourseList from "./pages/admin/AdminCourseList";
import AdminAddCourse from "./pages/admin/AdminAddCourse";
import AdminCourseViewMarks from "./pages/admin/AdminCourseViewMarks";
import AdminSubjectList from "./pages/admin/AdminSubjectList";
import AdminManageSubjects from "./pages/admin/AdminManageSubjects";
import AdminManageNotices from "./pages/admin/AdminManageNotices";
import AdminStudentFeedback from "./pages/admin/AdminStudentFeedback";
import AdminFeedbackResponse from "./pages/admin/AdminFeedbackResponse";

// ================= STUDENT =================
import StudentDashboard from "./pages/students/Dashboard";
import StudentProfile from "./pages/students/Profile";
import StudentAttendance from "./pages/students/Attendance";
import StudentFees from "./pages/students/Fees";
import StudentFeedback from "./pages/students/Feedback";
import StudentMarks from "./pages/students/Marks";
import StudentNotices from "./pages/students/Notices";
import StudentSchedule from "./pages/students/Schedule";
import StudentSubjects from "./pages/students/Subjects";
import StudentExams from "./pages/students/StudentExams";

// ================= TEACHER =================
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherStudentAttendance from "./pages/teacher/TeacherStudentAttendance";
import TeacherStudentList from "./pages/teacher/TeacherStudentList";
import TeacherEvaluateStudent from "./pages/teacher/TeacherEvaluateStudent";
import TeacherNotices from "./pages/teacher/TeacherNotices";
import TeacherSchedule from "./pages/teacher/TeacherSchedule";
import TeacherSubjects from "./pages/teacher/TeacherSubjects";
import TeacherExams from "./pages/teacher/TeacherExams";

const App = () => {
  return (
    <>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin" element={<MainLayout role="admin" />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="add-user" element={<AdminAddUser />} />
            <Route path="students" element={<AdminStudentDashboard />} />
            <Route path="students/add" element={<AdminAddStudent />} />
            <Route path="students/list" element={<AdminStudentList />} />
            <Route path="students/attendance" element={<AdminStudentAttendance />} />
            <Route path="students/marks" element={<AdminStudentMarks />} />
            <Route path="students/view-marks" element={<AdminViewStudentMarks />} />
            <Route path="students/fees" element={<AdminStudentFees />} />
            <Route path="teachers" element={<AdminTeacherDashboard />} />
            <Route path="teachers/add" element={<AdminAddTeacher />} />
            <Route path="teachers/list" element={<AdminTeachersList />} />
            <Route path="teachers/attendance" element={<AdminTeacherAttendance />} />
            <Route path="courses" element={<AdminCourseList />} />
            <Route path="courses/add" element={<AdminAddCourse />} />
            <Route path="courses/marks" element={<AdminCourseViewMarks />} />
            <Route path="subjects" element={<AdminSubjectList />} />
            <Route path="subjects/manage" element={<AdminManageSubjects />} />
            <Route path="notices" element={<AdminManageNotices />} />
            <Route path="feedbacks" element={<AdminStudentFeedback />} />
            <Route path="feedback-response" element={<AdminFeedbackResponse />} />
          </Route>
        </Route>

        {/* STUDENT */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_STUDENT"]} />}>
          <Route path="/student" element={<MainLayout role="student" />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="feedback" element={<StudentFeedback />} />
            <Route path="marks" element={<StudentMarks />} />
            <Route path="notices" element={<StudentNotices />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="subjects" element={<StudentSubjects />} />
            <Route path="exams" element={<StudentExams />} />
          </Route>
        </Route>

        {/* TEACHER */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_TEACHER"]} />}>
          <Route path="/teacher" element={<MainLayout role="teacher" />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="mysubjects" element={<TeacherSubjects />} />
            <Route path="schedule" element={<TeacherSchedule />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="student-list" element={<TeacherStudentList />} />
            <Route path="student-attendance" element={<TeacherStudentAttendance />} />
            <Route path="evaluate" element={<TeacherEvaluateStudent />} />
            <Route path="notices" element={<TeacherNotices />} />
            <Route path="exams" element={<TeacherExams />} />
          </Route>
        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;

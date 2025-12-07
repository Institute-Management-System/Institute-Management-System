  import React, { useState } from "react";
  import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
  import { 
    FaUserCircle, FaTachometerAlt, FaBook, FaCalendarAlt, 
    FaThumbsUp, FaCommentDots, FaBell, FaSignOutAlt, FaUsers 
  } from 'react-icons/fa';

  const TeacherLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentOpen, setStudentOpen] = useState(false);

    // Helper for active class
    const getLinkClass = ({ isActive }) => 
      `sidebar-link ${isActive ? "active" : ""}`;

    // Check if any student route is active to keep dropdown open or highlighted
    const isStudentActive = location.pathname.includes("/teacher/student") || 
                            location.pathname.includes("/teacher/evaluate");

    return (
      <div className="layout-wrapper">
        
        {/* SIDEBAR */}
        <aside className="sidebar-container">
          
          {/* Profile Header */}
          <div 
            className="p-4 d-flex align-items-center border-bottom border-secondary"
            style={{ borderColor: 'rgba(255,255,255,0.1) !important', cursor: 'pointer' }}
            onClick={() => navigate('/teacher/profile')}
          >
            <FaUserCircle size={32} className="me-3" />
            <span className="fw-bold fs-5">My Profile</span>
          </div>

          {/* Menu Items */}
          <nav className="flex-grow-1 py-3 px-2">
            
            <NavLink to="/teacher/dashboard" className={getLinkClass}>
              <FaTachometerAlt /> Dashboard
            </NavLink>

            {/* Student Dropdown */}
            <div>
              <button
                className={`sidebar-link w-100 ${isStudentActive ? "active" : ""}`}
                onClick={() => setStudentOpen(!studentOpen)}
              >
                <FaUsers /> 
                <span className="flex-grow-1">Student</span>
                <span>{studentOpen ? "▾" : "▸"}</span>
              </button>

              {/* Dropdown Links */}
              {(studentOpen || isStudentActive) && (
                <div className="bg-black bg-opacity-25 rounded mb-2">
                  <NavLink to="/teacher/student-list" className="sidebar-link ps-5">
                    <small>Student List</small>
                  </NavLink>
                  <NavLink to="/teacher/evaluate-student" className="sidebar-link ps-5">
                    <small>Evaluate Student</small>
                  </NavLink>
                  <NavLink to="/teacher/student-attendance" className="sidebar-link ps-5">
                    <small>Student Attendance</small>
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/teacher/subjects" className={getLinkClass}>
              <FaBook /> Subjects
            </NavLink>
            <NavLink to="/teacher/schedule" className={getLinkClass}>
              <FaCalendarAlt /> Schedule
            </NavLink>
            <NavLink to="/teacher/attendance" className={getLinkClass}>
              <FaThumbsUp /> Attendance
            </NavLink>
            <NavLink to="/teacher/feedback" className={getLinkClass}>
              <FaCommentDots /> Feedback
            </NavLink>
            <NavLink to="/teacher/notices" className={getLinkClass}>
              <FaBell /> Notices
            </NavLink>
          </nav>

          {/* Logout */}
          <div className="p-3 border-top border-secondary" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
            <button className="sidebar-link text-danger w-100" onClick={() => navigate('/')}>
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA (Where pages load) */}
        <main className="main-content">
          <Outlet /> 
        </main>
      </div>
    );
  };

  export default TeacherLayout;
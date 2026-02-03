import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook,
  FaSignOutAlt, FaUser, FaClipboardList, FaMoneyBillWave,
  FaBell, FaCommentDots, FaChevronDown, FaChevronRight, FaUserPlus, FaEdit, FaBars
} from "react-icons/fa";
import Logo from "../assets/Logo.png";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const MainLayout = ({ role }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const getLinks = () => {
    if (role === "admin") {
      return [
        { path: "/admin/dashboard", label: t('dashboard'), icon: <FaHome /> },
        { path: "/admin/profile", label: t('profile'), icon: <FaUser /> },
        { path: "/admin/add-user", label: t('add_user'), icon: <FaUserPlus /> },

        { path: "/admin/students", label: t('students'), icon: <FaUserGraduate /> },
        { path: "/admin/teachers", label: t('teachers'), icon: <FaChalkboardTeacher /> },

        { path: "/admin/courses", label: t('courses'), icon: <FaBook /> },
        { path: "/admin/subjects", label: t('subjects'), icon: <FaClipboardList /> },
        { path: "/admin/notices", label: t('notices'), icon: <FaBell /> },

      ];
    }
    else if (role === "teacher") {
      return [
        { path: "/teacher/dashboard", label: t('dashboard'), icon: <FaHome /> },
        { path: "/teacher/profile", label: t('profile'), icon: <FaUser /> },
        {
          label: t('student_info'),
          icon: <FaUserGraduate />,
          isDropdown: true,
          subLinks: [
            { path: "/teacher/student-list", label: t('student_list') },
            { path: "/teacher/evaluate", label: t('evaluate_student') },
            { path: "/teacher/student-attendance", label: t('student_attendance') }
          ]
        },
        { path: "/teacher/attendance", label: t("my_attendance"), icon: <FaBook /> },
        { path: "/teacher/mysubjects", label: t('my_subjects'), icon: <FaBook /> },
        { path: "/teacher/exams", label: t('exams'), icon: <FaEdit /> },

        { path: "/teacher/notices", label: t('notices'), icon: <FaBell /> },

      ];
    }
    else if (role === "student") {
      return [
        { path: "/student/dashboard", label: t('dashboard'), icon: <FaHome /> },
        { path: "/student/profile", label: t('profile'), icon: <FaUser /> },
        { path: "/student/subjects", label: t('subjects'), icon: <FaBook /> },
        { path: "/student/attendance", label: t('attendance'), icon: <FaClipboardList /> },
        { path: "/student/marks", label: t('marks'), icon: <FaBook /> },

        { path: "/student/exams", label: t('exams'), icon: <FaEdit /> },
        { path: "/student/notices", label: t('notices'), icon: <FaBell /> },
        { path: "/student/feedback", label: t('feedback'), icon: <FaCommentDots /> },
      ];
    }
    return [];
  };

  return (
    <div className="layout-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Mobile Toggle Button */}
      <button
        className="btn btn-primary d-md-none position-fixed top-0 start-0 m-3 z-3 shadow"
        onClick={toggleSidebar}
        style={{ zIndex: 1001 }}
      >
        <FaBars />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay d-md-none" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar d-flex flex-column ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-center py-3 border-bottom border-secondary">
          <img src={Logo} alt="Logo" width={40} className="me-2" />
          <h5 className="m-0 fw-bold text-uppercase text-white">{t(role)} {t('panel')}</h5>
        </div>

        <nav className="flex-grow-1 px-2 mt-3 overflow-auto">
          {getLinks().map((link, index) => {
            if (link.isDropdown) {
              const isActive = link.subLinks.some(sub => sub.path === location.pathname);
              const isOpen = openMenu === link.label || isActive;

              return (
                <div key={index} className="mb-1">
                  <div
                    className={`nav-link d-flex justify-content-between align-items-center text-white-50 ${isActive ? 'text-white' : ''}`}
                    onClick={() => toggleMenu(link.label)}
                    style={{ cursor: "pointer", padding: "10px 15px", borderRadius: "8px" }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-3">{link.icon}</span>
                      {link.label}
                    </div>
                    {isOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                  </div>

                  {isOpen && (
                    <div className="mt-1 rounded" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", marginLeft: "10px" }}>
                      {link.subLinks.map((sub, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={sub.path}
                          onClick={closeSidebar}
                          className={({ isActive }) => `d-block py-2 ps-5 text-decoration-none ${isActive ? "text-white fw-bold" : "text-white-50"}`}
                          style={{ fontSize: "0.9rem" }}
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={index}
                to={link.path}
                onClick={closeSidebar} // Close on mobile navigation
                className={({ isActive }) => `nav-link d-flex align-items-center mb-1 ${isActive ? "active-link" : "text-white-50"}`}
                style={{ padding: "10px 15px", borderRadius: "8px", textDecoration: "none" }}
              >
                <span className="me-3">{link.icon}</span>
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-top border-secondary">
          <LanguageSwitcher />
          <button
            onClick={() => setShowLogoutModal(true)}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center shadow-sm"
          >
            <FaSignOutAlt className="me-2" /> {t('log_out')}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={modalOverlayStyle}>
          <div className="card shadow-lg p-4 text-center" style={{ width: "350px", borderRadius: "15px" }}>
            <div className="mb-3 text-warning">
              <FaSignOutAlt size={50} />
            </div>
            <h4 className="fw-bold mb-2">{t('confirm_logout')}</h4>
            <p className="text-muted mb-4">{t('logout_confirmation_message')}</p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-secondary px-4 rounded-pill"
                onClick={() => setShowLogoutModal(false)}
              >
                {t('cancel')}
              </button>
              <button
                className="btn btn-danger px-4 rounded-pill fw-bold"
                onClick={handleLogout}
              >
                {t('yes_logout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050,
  backdropFilter: "blur(3px)"
};



export default MainLayout;
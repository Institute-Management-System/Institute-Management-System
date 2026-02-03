import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaClipboardList,
  FaBell,
  FaCommentDots,
  FaChevronDown,
  FaChevronRight,
  FaUserPlus,
  FaEdit
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getLinks = () => {
    if (role === "admin") {
      return [
        { path: "/admin/dashboard", label: t("dashboard"), icon: <FaHome /> },
        { path: "/admin/profile", label: t("profile"), icon: <FaUser /> },
        { path: "/admin/add-user", label: t("add_user"), icon: <FaUserPlus /> },
        { path: "/admin/students", label: t("students"), icon: <FaUserGraduate /> },
        { path: "/admin/teachers", label: t("teachers"), icon: <FaChalkboardTeacher /> },
        { path: "/admin/courses", label: t("courses"), icon: <FaBook /> },
        { path: "/admin/subjects", label: t("subjects"), icon: <FaClipboardList /> },
        { path: "/admin/notices", label: t("notices"), icon: <FaBell /> }
      ];
    }

    if (role === "teacher") {
      return [
        { path: "/teacher/dashboard", label: t("dashboard"), icon: <FaHome /> },
        { path: "/teacher/profile", label: t("profile"), icon: <FaUser /> },

        {
          label: t("student_info"),
          icon: <FaUserGraduate />,
          isDropdown: true,
          subLinks: [
            { path: "/teacher/student-list", label: t("student_list") },
            { path: "/teacher/evaluate", label: t("evaluate_student") },
            { path: "/teacher/student-attendance", label: t("student_attendance") }
          ]
        },

        { path: "/teacher/attendance", label: t("my_attendance"), icon: <FaBook /> },
        { path: "/teacher/mysubjects", label: t("my_subjects"), icon: <FaBook /> },
        { path: "/teacher/exams", label: t("exams"), icon: <FaEdit /> },
        { path: "/teacher/notices", label: t("notices"), icon: <FaBell /> }
      ];
    }

    if (role === "student") {
      return [
        { path: "/student/dashboard", label: t("dashboard"), icon: <FaHome /> },
        { path: "/student/profile", label: t("profile"), icon: <FaUser /> },
        { path: "/student/subjects", label: t("subjects"), icon: <FaBook /> },
        { path: "/student/attendance", label: t("attendance"), icon: <FaClipboardList /> },
        { path: "/student/marks", label: t("marks"), icon: <FaBook /> },
        { path: "/student/exams", label: t("exams"), icon: <FaEdit /> },
        { path: "/student/notices", label: t("notices"), icon: <FaBell /> },
        { path: "/student/feedback", label: t("feedback"), icon: <FaCommentDots /> }
      ];
    }

    return [];
  };

  return (
    <div className="layout-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Sidebar */}
      <aside className="sidebar d-flex flex-column">
        <div className="sidebar-header d-flex align-items-center justify-content-center py-3 border-bottom border-secondary">
          <img src={Logo} alt="Logo" width={40} className="me-2" />
          <h5 className="m-0 fw-bold text-uppercase text-white">
            {t(role)} {t("panel")}
          </h5>
        </div>

        <nav className="flex-grow-1 px-2 mt-3 overflow-auto">
          {getLinks().map((link, index) => {
            if (link.isDropdown) {
              const isActive = link.subLinks.some(
                (sub) => sub.path === location.pathname
              );
              const isOpen = openMenu === link.label || isActive;

              return (
                <div key={index}>
                  <div
                    className={`nav-link d-flex justify-content-between align-items-center text-white-50 ${
                      isActive ? "text-white" : ""
                    }`}
                    onClick={() => toggleMenu(link.label)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-3">{link.icon}</span>
                      {link.label}
                    </div>
                    {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                  </div>

                  {isOpen &&
                    link.subLinks.map((sub, i) => (
                      <NavLink
                        key={i}
                        to={sub.path}
                        className={({ isActive }) =>
                          `d-block ps-5 py-2 ${
                            isActive ? "text-white fw-bold" : "text-white-50"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                </div>
              );
            }

            return (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "active-link" : "text-white-50"
                  }`
                }
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
            className="btn btn-danger w-100 mt-2"
            onClick={() => setShowLogoutModal(true)}
          >
            <FaSignOutAlt className="me-2" /> {t("log_out")}
          </button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={modalOverlayStyle}>
          <div className="card p-4 text-center">
            <FaSignOutAlt size={40} className="text-danger mb-3" />
            <h5>{t("confirm_logout")}</h5>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                {t("cancel")}
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                {t("yes_logout")}
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
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999
};

export default MainLayout;

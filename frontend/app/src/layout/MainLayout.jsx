// Import React and useState hook
import React, { useState } from "react";

// NavLink: for sidebar links with active styling
// Outlet: renders child routes inside layout
// useNavigate: programmatic navigation
// useLocation: get current URL path
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

// Toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sidebar icons
import { 
  FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, 
  FaSignOutAlt, FaUser, FaClipboardList, FaMoneyBillWave,
  FaBell, FaCommentDots, FaChevronDown, FaChevronRight, FaUserPlus 
} from "react-icons/fa";

// Institute logo
import Logo from "../assets/Logo.png"; 

// MainLayout component receives role (admin / teacher / student) as prop
const MainLayout = ({ role }) => {

  // navigate helps redirect users
  const navigate = useNavigate();

  // location is used to detect active routes (important for dropdown logic)
  const location = useLocation();

  // openMenu stores which dropdown menu is currently expanded
  const [openMenu, setOpenMenu] = useState(null);

  // Logout handler
  const handleLogout = () => {
    toast.info("Logged out successfully");

    // Redirect to home page after logout
    setTimeout(() => navigate("/"), 1000);
  };

  // Toggles dropdown menus
  const toggleMenu = (menuName) => {
    // If clicked menu is already open, close it; otherwise open it
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  // Returns sidebar links based on user role
  const getLinks = () => {

    // Admin sidebar configuration
    if (role === "admin") {
      return [
        // Admin links will go here
        { path: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> }
      ];
    } 

    // Teacher sidebar configuration
    else if (role === "teacher") {
      return [
        // Teacher links will go here
         { path: "/teacher/dashboard", label: "Dashboard", icon: <FaHome /> },
          { path: "/teacher/profile", label: "Profile", icon: <FaUser /> },
        { 
          label: "Student Info", 
          icon: <FaUserGraduate />, 
          isDropdown: true, 
          subLinks: [
           
          ]
        }
      ];
    } 

    // Student sidebar configuration
    else if (role === "student") {
      return [
        // Student links will go here
         { path: "/student/dashboard", label: "Dashboard", icon: <FaHome /> },
         { path: "/student/profile", label: "Profile", icon: <FaUser /> }
      ];
    }

    // Fallback
    return [];
  };

  return (
    <div className="layout-wrapper">

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar d-flex flex-column">

        {/* Sidebar header */}
        <div className="sidebar-header d-flex align-items-center justify-content-center py-3 border-bottom border-secondary">
          <img src={Logo} alt="Logo" width={40} className="me-2" />
          <h5 className="m-0 fw-bold text-uppercase text-white">
            {role} Panel
          </h5>
        </div>

        {/* Sidebar navigation */}
        <nav className="flex-grow-1 px-2 mt-3 overflow-auto">

          {/* Loop through links based on role */}
          {getLinks().map((link, index) => {

            // ===== DROPDOWN MENU =====
            if (link.isDropdown) {

              // Check if any sub-link is active
              const isActive = link.subLinks.some(
                sub => sub.path === location.pathname
              );

              // Dropdown should stay open if active or manually opened
              const isOpen = openMenu === link.label || isActive;

              return (
                <div key={index} className="mb-1">

                  {/* Dropdown header */}
                  <div 
                    className={`nav-link d-flex justify-content-between align-items-center text-white-50 ${isActive ? 'text-white' : ''}`} 
                    onClick={() => toggleMenu(link.label)}
                    style={{ cursor: "pointer", padding: "10px 15px", borderRadius: "8px" }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-3">{link.icon}</span>
                      {link.label}
                    </div>

                    {/* Chevron icon toggles */}
                    {isOpen ? <FaChevronDown size={12}/> : <FaChevronRight size={12}/>}
                  </div>
                  
                  {/* Dropdown content */}
                  {isOpen && (
                    <div 
                      className="mt-1 rounded" 
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", marginLeft: "10px" }}
                    >
                      {link.subLinks.map((sub, subIndex) => (
                        <NavLink 
                          key={subIndex} 
                          to={sub.path} 
                          className={({ isActive }) =>
                            `d-block py-2 ps-5 text-decoration-none ${
                              isActive ? "text-white fw-bold" : "text-white-50"
                            }`
                          }
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

            // ===== NORMAL NAV LINK =====
            return (
              <NavLink 
                key={index} 
                to={link.path} 
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center mb-1 ${
                    isActive ? "active-link" : "text-white-50"
                  }`
                }
                style={{ padding: "10px 15px", borderRadius: "8px", textDecoration: "none" }}
              >
                <span className="me-3">{link.icon}</span>
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="p-3 border-top border-secondary">
          <button 
            onClick={handleLogout} 
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center shadow-sm"
          >
            <FaSignOutAlt className="me-2" /> Log Out
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      {/* Outlet renders child routes dynamically */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

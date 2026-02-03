// React hooks for state and lifecycle
import React, { useState } from "react";

// React Router hook for navigation
import { useNavigate } from "react-router-dom";

// Toast notifications for success/error feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Logo asset
import Logo from "../assets/Logo.png";

// Axios API instance
import API from "../api";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

// Language switcher component
import LanguageSwitcher from "../components/LanguageSwitcher";

const Login = () => {
  // Translation function
  const { t } = useTranslation();

  // Navigation handler
  const navigate = useNavigate();

  // Username/email input
  const [username, setUsername] = useState("");

  // Password input
  const [password, setPassword] = useState("");

  /* ================= CLEAR EXISTING SESSION ================= */
  // Ensures clean login state when visiting login page
  React.useEffect(() => {
    sessionStorage.removeItem("user");
  }, []);

  /* ================= HANDLE LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // API call to authenticate user
      const response = await API.post("/auth/login", {
        username: username,
        password: password,
      });

      const userData = response.data;

      // Persist authenticated user in session storage
      sessionStorage.setItem("user", JSON.stringify(userData));

      // Determine redirection based on backend-provided roles
      const userRoles = userData.roles || [];
      let targetDashboard = "/student/dashboard"; // Default role

      if (userRoles.includes("ROLE_ADMIN")) {
        targetDashboard = "/admin/dashboard";
      } else if (userRoles.includes("ROLE_TEACHER")) {
        targetDashboard = "/teacher/dashboard";
      }

      toast.success("Login Successful!");

      // Redirect after short delay
      setTimeout(() => {
        navigate(targetDashboard);
      }, 1000);

    } catch (error) {
      console.error("Login Error", error);

      // Show backend error message if available
      toast.error(
        error.response?.data?.message ||
        error.response?.data ||
        "Login Failed! Check credentials."
      );
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= MAIN LAYOUT ================= */}
      <div className="d-flex vh-100">
        {/* ================= LEFT SIDE (BRANDING) ================= */}
        <div className="d-flex flex-column justify-content-center align-items-center bg-white col-md-5 p-5">
          <img
            src={Logo}
            alt="Logo"
            width={120}
            className="mb-4"
          />
          <h2
            className="fw-bold text-center"
            style={{ color: "#1f2b70" }}
          >
            {t("institute_management_system")}
          </h2>
        </div>

        {/* ================= RIGHT SIDE (LOGIN FORM) ================= */}
        <div
          className="d-flex flex-column justify-content-center px-5 col-md-7"
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          {/* Language Switcher */}
          <div className="ms-auto mb-3">
            <LanguageSwitcher />
          </div>

          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
            <h3 className="fw-bold mb-4">
              {t("login_title")}
            </h3>

            {/* ================= LOGIN FORM ================= */}
            <form onSubmit={handleLogin}>

              {/* Username / Email */}
              <div className="mb-3">
                <label className="fw-bold mb-1">
                  {t("username_email")}
                </label>
                <input
                  className="form-control border-0 py-2"
                  type="text"
                  placeholder={t("username_placeholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="fw-bold mb-1">
                  Password
                </label>
                <input
                  className="form-control border-0 py-2"
                  type="password"
                  placeholder={t("password_placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Forget Password Link */}
              <div className="text-end mb-4">
                <span
                  className="small text-light text-decoration-underline"
                  style={{ cursor: "pointer", opacity: 0.8 }}
                  onClick={() => navigate("/forget-password")}
                >
                  {t("forget_password")}
                </span>
              </div>

              {/* Login Button */}
              <button
                className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm"
                style={{ backgroundColor: "#2563eb", border: "none" }}
              >
                {t("login_button")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

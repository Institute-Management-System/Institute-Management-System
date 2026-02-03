import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.png";
import API from "../api";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Clear existing session when visiting login page
  React.useEffect(() => {
    sessionStorage.removeItem("user");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        username: username,
        password: password
      });

      const userData = response.data;

      sessionStorage.setItem("user", JSON.stringify(userData));

      // Determine redirection based on backend roles
      const userRoles = userData.roles || [];
      let targetDashboard = "/student/dashboard"; // Default

      if (userRoles.includes("ROLE_ADMIN")) {
        targetDashboard = "/admin/dashboard";
      } else if (userRoles.includes("ROLE_TEACHER")) {
        targetDashboard = "/teacher/dashboard";
      }

      toast.success("Login Successful!");
      setTimeout(() => {
        navigate(targetDashboard);
      }, 1000);

    } catch (error) {
  console.error("Login Error", error);

  let errorMessage = "Login Failed! Check credentials.";

  if (error.response) {
    if (typeof error.response.data === "string") {
      errorMessage = error.response.data;
    } else if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response.status === 401) {
      errorMessage = "Invalid username or password";
    }
  }

  toast.error(errorMessage);
}

  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="container-fluid p-0 vh-100">
        <div className="row g-0 h-100">
          {/* Left Side (Brand) */}
          <div className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center bg-white p-5">
            <img src={Logo} alt="Logo" width={120} className="mb-4" />
            <h2 className="fw-bold text-center" style={{ color: "#1f2b70" }}>{t('institute_management_system')}</h2>
          </div>

          {/* Right Side (Login Form) */}
          <div className="col-12 col-md-7 d-flex flex-column justify-content-center px-5" style={{ backgroundColor: "#1f2b70", color: "white" }}>
            <div className="ms-auto mb-3">
              <LanguageSwitcher />
            </div>
            <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
              <h3 className="fw-bold mb-4">{t('login_title')}</h3>

              <form onSubmit={handleLogin}>

                {/* Role Selection */}


                {/* Email / Username */}
                <div className="mb-3">
                  <label className="fw-bold mb-1">{t('username_email')}</label>
                  <input
                    className="form-control border-0 py-2"
                    type="text"
                    placeholder={t('username_placeholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="mb-2">
                  <label className="fw-bold mb-1">{t('password')}</label>
                  <input
                    className="form-control border-0 py-2"
                    type="password"
                    placeholder={t('password_placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Forget Password */}
                <div className="text-end mb-4">
                  <span
                    className="small text-light text-decoration-underline"
                    style={{ cursor: "pointer", opacity: 0.8 }}
                    onClick={() => navigate("/forget-password")}
                  >
                    {t('forget_password')}
                  </span>
                </div>

                {/* Login Button */}
                <button className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm" style={{ backgroundColor: "#2563eb", border: "none" }}>
                  {t('login_button')}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
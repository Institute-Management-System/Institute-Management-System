// React hook for state management
import React, { useState } from "react";

// React Router hook for navigation
import { useNavigate } from "react-router-dom";

// Toast notifications for success/error feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Logo asset
import Logo from "../assets/Logo.png";

// Icon for back navigation
import { FaArrowLeft } from "react-icons/fa";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

// Axios API instance
import API from "../api";

const Register = () => {
  // Translation function
  const { t } = useTranslation();

  // Navigation handler
  const navigate = useNavigate();

  // Form state for registration data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student",      // Default role
    password: "",
    confirmPassword: ""
  });

  /* ================= INPUT CHANGE HANDLER ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ================= HANDLE FORM SUBMISSION ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error(t("passwords_do_not_match"));
      return;
    }

    try {
      // API call to register new user
      await API.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        password: formData.password
      });

      toast.success(t("account_created_success"));

      // Redirect to login after successful registration
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Registration Error", error);

      // Show backend error message if available
      toast.error(
        error.response?.data?.message ||
        error.response?.data ||
        t("registration_failed")
      );
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= MAIN LAYOUT ================= */}
      <div className="d-flex vh-100">
        {/* ================= LEFT SECTION (BRANDING) ================= */}
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

        {/* ================= RIGHT SECTION (REGISTRATION FORM) ================= */}
        <div
          className="d-flex flex-column justify-content-center px-5 col-md-7"
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
            {/* Title */}
            <h3 className="fw-bold mb-4">
              {t("create_new_account")}
            </h3>

            {/* Description */}
            <p className="small mb-4 text-white-50">
              {t("authorized_admin_access")}
            </p>

            {/* ================= REGISTRATION FORM ================= */}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label className="fw-bold mb-1">
                  {t("full_name")}
                </label>
                <input
                  name="fullName"
                  className="form-control border-0 py-2"
                  placeholder={t("enter_name")}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="fw-bold mb-1">
                  {t("email_address")}
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control border-0 py-2"
                  placeholder={t("enter_email")}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="mb-3">
                <label className="fw-bold mb-1">
                  {t("assign_role")}
                </label>
                <select
                  name="role"
                  className="form-select border-0 py-2"
                  onChange={handleChange}
                >
                  <option value="student">{t("student")}</option>
                  <option value="teacher">{t("teacher")}</option>
                  <option value="admin">{t("admin")}</option>
                </select>
              </div>

              {/* Password & Confirm Password */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="fw-bold mb-1">
                    {t("password_placeholder")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control border-0 py-2"
                    placeholder={t("password_placeholder")}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="fw-bold mb-1">
                    {t("confirm")}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control border-0 py-2"
                    placeholder={t("confirm")}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold mb-4 shadow-sm"
                style={{ backgroundColor: "#2563eb", border: "none" }}
              >
                {t("create_account").toUpperCase()}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <span
                  className="text-white text-decoration-none small"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  <FaArrowLeft className="me-2" />
                  {t("back_to_login")}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

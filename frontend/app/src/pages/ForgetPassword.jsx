// React hook for state management
import React, { useState } from "react";

// React Router hook for navigation
import { useNavigate } from "react-router-dom";

// Toast notifications for success/error messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { FaArrowLeft } from "react-icons/fa";

// Logo asset
import Logo from "../assets/Logo.png";

// Axios API instance
import API from "../api";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  // Translation function
  const { t } = useTranslation();

  // Navigation handler
  const navigate = useNavigate();

  // Email input state
  const [email, setEmail] = useState("");

  // Loader flag to disable button while request is in progress
  const [loading, setLoading] = useState(false);

  /* ================= HANDLE FORM SUBMISSION ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      toast.error(t("please_enter_email"));
      return;
    }

    try {
      setLoading(true);

      // API call to request password reset link
      await API.post("/auth/forgot-password", { email });

      toast.success(t("reset_link_sent"));

      // Redirect to login page after success
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error(error);

      // Show backend error message if available
      toast.error(error.response?.data || t("failed_send_link"));
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= MAIN LAYOUT ================= */}
      <div className="d-flex vh-100">
        {/* ================= LEFT SECTION (LOGO & TITLE) ================= */}
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

        {/* ================= RIGHT SECTION (FORM) ================= */}
        <div
          className="d-flex flex-column justify-content-center px-5 col-md-7"
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
            {/* Title */}
            <h3 className="fw-bold mb-2">
              {t("forget_password_title")}
            </h3>

            {/* Description */}
            <p className="text-white-50 mb-4 small">
              {t("forget_password_desc")}
            </p>

            {/* ================= FORGOT PASSWORD FORM ================= */}
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label className="fw-bold mb-1">
                  {t("email_address")}
                </label>
                <input
                  type="email"
                  className="form-control border-0 py-2"
                  placeholder={t("enter_registered_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-bold mb-4 shadow-sm"
                style={{ backgroundColor: "#2563eb", border: "none" }}
              >
                {loading ? t("sending") : t("send_reset_link")}
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

export default ForgetPassword;

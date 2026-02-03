// React hook for state management
import React, { useState } from "react";

// React Router hooks for navigation and query params
import { useNavigate, useSearchParams } from "react-router-dom";

// Toast notifications for success/error feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon for password input
import { FaLock } from "react-icons/fa";

// Logo asset
import Logo from "../assets/Logo.png";

// Axios API instance
import API from "../api";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  // Translation function
  const { t } = useTranslation();

  // Navigation handler
  const navigate = useNavigate();

  // Read query parameters from URL
  const [searchParams] = useSearchParams();

  // Extract reset token from URL
  const token = searchParams.get("token");

  // Password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loader flag
  const [loading, setLoading] = useState(false);

  /* ================= HANDLE PASSWORD RESET ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: all fields required
    if (!password || !confirmPassword) {
      toast.error(t("fill_all_fields"));
      return;
    }

    // Validation: passwords must match
    if (password !== confirmPassword) {
      toast.error(t("passwords_do_not_match"));
      return;
    }

    try {
      setLoading(true);

      // API call to reset password using token
      await API.post("/auth/reset-password", { token, password });

      toast.success(t("password_reset_success"));

      // Redirect to login after success
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error(error);

      // Show backend error message if available
      toast.error(
        error.response?.data || t("failed_reset_password")
      );
      setLoading(false);
    }
  };

  /* ================= INVALID TOKEN STATE ================= */
  if (!token) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <h3>{t("invalid_token")}</h3>
      </div>
    );
  }

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} />

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

        {/* ================= RIGHT SECTION (RESET FORM) ================= */}
        <div
          className="d-flex flex-column justify-content-center px-5 col-md-7"
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
            {/* Title */}
            <h3 className="fw-bold mb-2">
              {t("reset_password_title")}
            </h3>

            {/* Description */}
            <p className="text-white-50 mb-4 small">
              {t("reset_password_desc")}
            </p>

            {/* ================= RESET PASSWORD FORM ================= */}
            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="mb-3">
                <label className="fw-bold mb-1">
                  {t("new_password")}
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <FaLock className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-0 py-2"
                    placeholder={t("enter_new_password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="fw-bold mb-1">
                  {t("confirm_password")}
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <FaLock className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-0 py-2"
                    placeholder={t("confirm_new_password")}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-bold mb-4 shadow-sm"
                style={{
                  backgroundColor: "#2563eb",
                  border: "none",
                }}
              >
                {loading
                  ? t("resetting")
                  : t("reset_password_button")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

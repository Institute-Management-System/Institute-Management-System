// React hooks for state, lifecycle, and DOM references
import React, { useState, useEffect, useRef } from "react";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

// Toast notifications for success/error feedback
import { ToastContainer, toast } from "react-toastify";

// Icons for profile avatar and upload action
import { FaCamera, FaUser } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// Student profile API services
import {
  fetchStudentProfile,      // Fetches logged-in student profile
  updateStudentProfile,     // Updates student profile data
} from "../../services/student.service";

const StudentProfile = () => {
  // Translation function
  const { t } = useTranslation();

  /* ================= STATE ================= */

  // Student profile form data
  const [formData, setFormData] = useState({
    rollNumber: "",
    fullName: "",
    qualification: "",
    email: "",
    phone: "",
    status: false,
    profileImage: "",
  });

  // Selected image file for upload
  const [imageFile, setImageFile] = useState(null);

  // Reference to hidden file input
  const fileInputRef = useRef(null);

  /* ================= LOAD PROFILE ON MOUNT ================= */
  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= FETCH STUDENT PROFILE ================= */
  const loadProfile = async () => {
    try {
      const data = await fetchStudentProfile();

      // Populate form with fetched profile data
      if (data) {
        setFormData({
          rollNumber: data.rollNumber || "",
          fullName: data.fullName || "",
          qualification: data.qualification || "",
          email: data.email || "",
          phone: data.phone || "",
          status: data.status || false,
          profileImage: data.profileImage || "",
        });
      }
    } catch (error) {
      toast.error(t("failed_load_profile"));
    }
  };

  /* ================= INPUT HANDLERS ================= */

  // Handles text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles profile image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      toast.success(t("photo_selected"));
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    // Validation: Full name is required
    if (!formData.fullName.trim()) {
      toast.error(t("full_name_required"));
      return;
    }

    try {
      // Prepare multipart form data
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("phone", formData.phone);

      // Attach profile image only if selected
      if (imageFile) {
        payload.append("profileImage", imageFile);
      }

      // API call to update profile
      await updateStudentProfile(payload);

      toast.success(t("profile_updated_success"));

      // Reset image state and reload profile
      setImageFile(null);
      loadProfile();
    } catch (error) {
      toast.error(t("profile_update_failed"));
    }
  };

  /* ================= UI ================= */
  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-center">
        <div className="card p-5 w-100" style={{ maxWidth: "850px" }}>
          {/* ===== PROFILE HEADER ===== */}
          <div className="text-center border-bottom pb-4 mb-4">
            {/* Profile Image / Avatar */}
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm"
              style={{ width: 110, height: 110, cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              {/* Preview selected image */}
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Profile"
                  className="w-100 h-100 rounded-circle"
                />

              /* Existing profile image */
              ) : formData.profileImage ? (
                <img
                  src={`http://localhost:8080/api${formData.profileImage}`}
                  alt="Profile"
                  className="w-100 h-100 rounded-circle"
                />

              /* Default avatar */
              ) : (
                <FaUser size={42} className="text-secondary" />
              )}
            </div>

            {/* Upload Trigger */}
            <div
              className="text-primary small fw-bold mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              <FaCamera className="me-1" />
              {t("upload_photo")}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Student Name & Roll */}
            <h4 className="fw-bold">
              {formData.fullName || t("student")}
            </h4>
            <p className="text-muted">
              {t("roll_number")}: {formData.rollNumber || "N/A"}
            </p>
          </div>

          {/* ===== PROFILE FORM ===== */}
          <h6 className="text-center text-muted fw-bold mb-4">
            {t("student_information")}
          </h6>

          <div className="row g-4">
            {/* Full Name */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t("full_name")}
              </label>
              <input
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Qualification (read-only) */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t("qualification")}
              </label>
              <input
                className="form-control"
                value={formData.qualification}
                disabled
              />
            </div>

            {/* Email (read-only) */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t("email_address")}
              </label>
              <input
                className="form-control"
                value={formData.email}
                disabled
              />
            </div>

            {/* Phone Number */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t("mobile")}
              </label>
              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Account Status */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t("status")}
              </label>
              <div>
                <span
                  className={`badge ${
                    formData.status
                      ? "bg-success"
                      : "bg-danger"
                  } px-3 py-2`}
                >
                  {formData.status
                    ? t("active")
                    : t("inactive")}
                </span>
              </div>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="d-flex justify-content-center gap-3 mt-5">
            <button
              className="btn btn-primary px-5 fw-bold"
              onClick={handleUpdate}
            >
              {t("update_profile")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;

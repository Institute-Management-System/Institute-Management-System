// ===================== Teacher Profile Page=====================

// React hooks for state, lifecycle, and refs
import React, { useEffect, useRef, useState } from "react";

// Internationalization (i18n) support
import { useTranslation } from "react-i18next";

// Toast notifications for feedback messages
import { ToastContainer, toast } from "react-toastify";

// Icons used in profile UI
import { FaCamera, FaUserTie } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// Application logo
import Logo from "../../assets/Logo.png";

// Backend services for profile operations
import {
  fetchTeacherProfile,
  updateTeacherProfile,
} from "../../services/teacherService";

// Service for uploading profile images
import ProfileService from "../../services/profile.service";

// ===================== COMPONENT =====================

const TeacherProfile = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== USER CONTEXT ===================== */

  // Get logged-in teacher details from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const teacherId = user?.id;

  /* ===================== STATE ===================== */

  // Form data for teacher profile
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    password: "",
    status: false,
  });

  // Backup data to restore on cancel
  const [backupData, setBackupData] = useState(null);

  // Profile image preview URL
  const [profileImage, setProfileImage] = useState(null);

  // Selected image file for upload
  const [imageFile, setImageFile] = useState(null);

  // Reference to hidden file input
  const fileInputRef = useRef(null);

  /* ===================== LOAD PROFILE ===================== */

  // Load teacher profile when teacherId is available
  useEffect(() => {
    if (teacherId) {
      loadProfile();
    } else {
      toast.error(t('user_not_authenticated'));
    }
  }, [teacherId]);

  // Fetch teacher profile details from backend
  const loadProfile = async () => {
    try {
      const res = await fetchTeacherProfile(teacherId);
      const data = res?.data?.data;

      if (!data) throw new Error();

      // Prepare safe profile data with fallbacks
      const safeData = {
        id: data.id ?? "",
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        designation: data.designation ?? "",
        password: "",
        status: data.status ?? false,
      };

      // Update form and backup state
      setFormData(safeData);
      setBackupData(safeData);

      // Set profile image if available
      if (data.profileImage) {
        setProfileImage(`http://localhost:8080/api${data.profileImage}`);
      }
    } catch {
      toast.error(t('failed_load_profile'));
    }
  };

  /* ===================== HANDLERS ===================== */

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image selection
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file);
      toast.success(t('photo_selected'));
    }
  };

  // Handle profile update submission
  const handleUpdate = async () => {
    // Basic validation
    if (!formData.fullName || !formData.phone) {
      toast.error(t('name_mobile_required'));
      return;
    }

    try {
      // Upload profile image if selected
      if (imageFile) {
        await ProfileService.uploadImage(imageFile);
      }

      // Prepare update payload
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        designation: formData.designation,
      };

      // Include password only if changed
      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      // Update teacher profile
      await updateTeacherProfile(teacherId, payload);

      // Reset password field and image file
      setBackupData({ ...formData, password: "" });
      setFormData((prev) => ({ ...prev, password: "" }));
      setImageFile(null);

      // Reload profile to fetch updated image and data
      await loadProfile();

      toast.success(t('profile_updated_success'));
    } catch {
      toast.error(t('profile_update_failed'));
    }
  };

  // Restore previous profile data
  const handleCancel = () => {
    if (backupData) {
      setFormData(backupData);
      setProfileImage(null);
      toast.info(t('changes_discarded'));
    }
  };

  /* ===================== UI ===================== */
  return (
    <>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center">
        <img src={Logo} alt="Logo" style={{ width: 40 }} className="me-3" />
        <h4 className="fw-bold mb-0" style={{ color: "#1a237e" }}>
          {t('profile')}
        </h4>
      </div>

      {/* Profile Card */}
      <div className="d-flex justify-content-center">
        <div className="card p-5 w-100" style={{ maxWidth: 850 }}>
          {/* Profile Header */}
          <div className="text-center border-bottom pb-4 mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm"
              style={{ width: 110, height: 110, cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-100 h-100 rounded-circle"
                />
              ) : (
                <FaUserTie size={42} className="text-secondary" />
              )}
            </div>

            {/* Change photo trigger */}
            <div
              className="text-primary small fw-bold mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              <FaCamera className="me-1" />
              {t('change_photo')}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />

            <h4 className="fw-bold">{formData.fullName || t('teacher')}</h4>
            <p className="text-muted">
              {t('id')}: {formData.id || "N/A"}
            </p>
          </div>

          {/* Profile Form */}
          <h6 className="text-center text-muted fw-bold mb-4">
            {t('personal_information')}
          </h6>

          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t('full_name')}
              </label>
              <input
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t('designation')}
              </label>
              <input
                className="form-control"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t('email_address')}
              </label>
              <input
                className="form-control"
                value={formData.email}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t('mobile')}
              </label>
              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password field */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t('new_password')}
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Status display */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                {t('status')}
              </label>
              <div>
                <span
                  className={`badge ${
                    formData.status ? "bg-success" : "bg-danger"
                  } px-3 py-2`}
                >
                  {formData.status ? t('active') : t('inactive')}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="d-flex justify-content-center gap-3 mt-5">
            <button
              className="btn btn-primary px-5 fw-bold"
              onClick={handleUpdate}
            >
              {t('update')}
            </button>

            <button
              className="btn btn-danger px-5 fw-bold"
              onClick={handleCancel}
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherProfile;

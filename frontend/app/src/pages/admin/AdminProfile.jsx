import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import Avatar from "../../assets/teacher.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

import ProfileService from "../../services/profile.service";

const AdminProfile = () => {
  const { t } = useTranslation();
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await ProfileService.getProfile();
      const data = response.data;
      setAdmin({
        name: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        designation: data.designation || "",
        password: "", // Don't prefill password
        profileImage: data.profileImage ? `http://localhost:8080/api${data.profileImage}` : null
      });
    } catch (error) {
      console.error("Failed to load profile", error);
      toast.error(t('failed_load_profile'));
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const response = await ProfileService.uploadImage(file);
      setAdmin(prev => ({ ...prev, profileImage: response.data.imageUrl }));
      toast.success(t('photo_selected'));
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  };

  const handleChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProfileService.updateProfile(admin);
      toast.success(t('profile_updated_success'));
      // Re-fetch to confirm sync/updates (optional if we trust local state)
      // fetchProfile(); 
    } catch (error) {
      console.error(error);
      toast.error(t('profile_update_failed'));
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* HEADER */}
      <header className="d-flex align-items-center p-3 border-bottom bg-white shadow-sm">
        <img src={Logo} alt="Logo" width={45} className="me-3" />
        <h4 className="mb-0 fw-bold">{t('admin_profile')}</h4>
      </header>

      {/* PROFILE BODY */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "700px", backgroundColor: "#f8f9fa" }}>

          {/* AVATAR */}
          <div className="text-center mb-4 position-relative">
            <div className="position-relative d-inline-block">
              <img
                src={admin.profileImage ? admin.profileImage : Avatar}
                alt="Admin"
                className="rounded-circle shadow-sm"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  border: "4px solid white",
                }}
              />
              <label
                htmlFor="upload-avatar"
                className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle cursor-pointer shadow-sm"
                style={{ cursor: "pointer" }}
                title={t('upload_photo')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                </svg>
              </label>
              <input
                type="file"
                id="upload-avatar"
                className="d-none"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) handleImageUpload(e.target.files[0]);
                }}
              />
            </div>
            <h5 className="mt-3 fw-bold">{admin.name}</h5>
            <span className="badge bg-primary">{admin.designation}</span>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">{t('full_name')}</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={admin.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">{t('designation')}</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={admin.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">{t('email_address')}</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={admin.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">{t('phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={admin.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">{t('new_password')}</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder={t('leave_blank_password')}
                  value={admin.password}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold">
                  {t('update_profile')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminProfile;
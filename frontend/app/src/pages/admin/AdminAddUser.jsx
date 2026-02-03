import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
import AdminService from "../../services/admin.service";
import { FaUserPlus, FaFileUpload, FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AddUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("single"); // 'single' or 'bulk'

  // Single User Form Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student",
    password: "",
  });

  // Bulk Upload Data
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await API.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        password: formData.password
      });

      toast.success(`New ${formData.role} created successfully!`);

      setFormData({
        fullName: "",
        email: "",
        role: "student",
        password: "",
      });
    } catch (error) {
      console.error("Create User Error", error);
      toast.error(error.response?.data?.message || error.response?.data || "Failed to create user");
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }

    try {
      const response = await AdminService.uploadUsers(file);
      toast.success(response.data);
      setFile(null);
    } catch (error) {
      console.error("Upload Error", error);
      toast.error(error.response?.data?.message || "Failed to upload file");
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('add_new_user')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "800px", backgroundColor: "#f8f9fa" }}>

          {/* Tabs */}
          <div className="d-flex justify-content-center mb-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${activeTab === 'single' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('single')}
              >
                <FaUserPlus className="me-2" /> {t('single_user')}
              </button>
              <button
                type="button"
                className={`btn ${activeTab === 'bulk' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('bulk')}
              >
                <FaFileUpload className="me-2" /> {t('bulk_upload')}
              </button>
            </div>
          </div>

          <h5 className="text-center text-muted mb-4 fw-bold text-uppercase">
            {activeTab === 'single' ? t('user_information') : t('upload_csv')}
          </h5>

          {activeTab === 'single' ? (
            <form onSubmit={handleSingleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('full_name')}</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('email_address')}</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('assign_role')}</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="student">{t('student')}</option>
                    <option value="teacher">{t('teacher')}</option>
                    <option value="admin">{t('admin')}</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('initial_password')}</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Set Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2 rounded-pill fw-bold"
                  >
                    {t('create_account')}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleBulkUpload}>
              <div className="text-center">
                <div className="mb-4">
                  <label className="form-label fw-bold d-block">{t('select_csv')}</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                  <div className="form-text mt-2">
                    Format: <code>fullName,email,password,phone,role</code>
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button type="submit" className="btn btn-primary px-4">
                    <FaFileUpload className="me-2" /> {t('upload_users')}
                  </button>
                </div>

                <div className="alert alert-info mt-4 text-start">
                  <strong>{t('note')}:</strong>
                  <ul className="mb-0">
                    <li>Header row is required: <code>fullName,email,password,phone,role</code></li>
                    <li>Role must be one of: <code>STUDENT, TEACHER, ADMIN</code></li>
                    <li>Duplicates emails will be skipped.</li>
                  </ul>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddUser;
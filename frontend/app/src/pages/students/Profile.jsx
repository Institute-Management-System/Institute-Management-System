// Import React hooks
import React, { useState, useEffect, useRef } from "react";

// Toast notifications for user feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons for profile and camera
import { FaCamera, FaUser } from "react-icons/fa";

// StudentProfile component
const StudentProfile = () => {

  // Main form state holding student profile details
  const [formData, setFormData] = useState({
    fullName: "",
    className: "",
    email: "",
    mobile: "",
    password: "",
    isActive: true,
  });

  // Backup state to restore data if user clicks Cancel
  const [backupData, setBackupData] = useState(null);

  // Stores preview URL of selected profile image
  const [profileImage, setProfileImage] = useState(null);

  // Reference to hidden file input (used to trigger click programmatically)
  const fileInputRef = useRef(null);

  // Runs once when component loads (fetch initial profile data)
  useEffect(() => {

    // Simulated backend response
    const fetchedFromDb = {
      fullName: "Prathmesh",
      className: "Class 10 - A",
      email: "prathmesh@gmail.com",
      mobile: "9876543210",
      password: "password123",
      isActive: true,
    };

    // Set fetched data into form
    setFormData(fetchedFromDb);

    // Save a backup copy for cancel functionality
    setBackupData(fetchedFromDb);

  }, []); // Empty dependency → runs only once

  // Handles input field changes (controlled inputs)
  const handleChange = (e) => {
    setFormData({
      ...formData,                 // keep old values
      [e.target.name]: e.target.value // update changed field
    });
  };

  // Handles profile image selection
  const handleFileChange = (e) => {

    // Ensure a file is selected
    if (e.target.files && e.target.files[0]) {

      const file = e.target.files[0];

      // Create preview URL for selected image
      setProfileImage(URL.createObjectURL(file));

      toast.success("Photo selected");
    }
  };

  // Handles profile update
  const handleUpdate = () => {

    // Basic validation
    if (!formData.fullName || !formData.email) {
      toast.error("Name and Email are required!");
      return;
    }

    // Save updated data as backup
    setBackupData(formData);

    // Backend call would go here
    // axios.put("/api/student/profile", formData)

    toast.success("Profile Updated Successfully!");
  };

  // Handles cancel action (revert changes)
  const handleCancel = () => {

    if (backupData) {

      // Restore previous saved data
      setFormData(backupData);

      // Remove selected image preview
      setProfileImage(null);

      toast.info("Changes discarded");
    }
  };

  return (
    <>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-center">
        <div className="card card-custom p-5 w-100" style={{ maxWidth: "850px" }}>
          
          {/* ================= PROFILE HEADER ================= */}
          <div className="text-center border-bottom pb-4 mb-4">

            {/* Profile Image Container */}
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm"
              style={{
                width: "110px",
                height: "110px",
                overflow: "hidden",
                border: "4px solid #fff",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current.click()} // trigger file input
            >
              {profileImage ? (
                // Show selected image preview
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-100 h-100 object-fit-cover" 
                />
              ) : (
                // Default user icon
                <FaUser size={40} className="text-secondary" />
              )}
            </div>

            {/* Upload / Change Photo Text */}
            <div
              className="mb-3 text-primary small fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              <FaCamera className="me-1" /> 
              {profileImage ? "Change Photo" : "Upload Photo"}
            </div>
            
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              hidden 
              onChange={handleFileChange} 
            />

            {/* Student Name */}
            <h4 className="fw-bold text-dark mb-1">
              {formData.fullName || "Student"}
            </h4>

            {/* Student ID (static for now) */}
            <p className="text-muted">ID: 7073</p>
          </div>

          {/* ================= FORM TITLE ================= */}
          <h5 className="text-center text-muted mb-4 small fw-bold text-uppercase">
            Student Information
          </h5>

          {/* ================= FORM FIELDS ================= */}
          <div className="row g-4">

            {/* Full Name */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">
                Full Name :
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Class */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">
                Class :
              </label>
              <input
                type="text"
                className="form-control"
                name="className"
                value={formData.className}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">
                Email :
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Mobile */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">
                Mobile No :
              </label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">
                Password :
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Account Status */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">
                Status :
              </label>
              <div>
                <span
                  className={`badge rounded-pill ${
                    formData.isActive ? "bg-success" : "bg-danger"
                  } px-3 py-2`}
                  style={{ userSelect: "none", opacity: 0.8 }}
                >
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="d-flex justify-content-center gap-3 mt-5">

            {/* Update Button */}
            <button
              className="btn text-white px-5 fw-bold shadow-sm"
              style={{ backgroundColor: "#1f2b70", border: "none" }}
              onClick={handleUpdate}
            >
              Update
            </button>

            {/* Cancel Button */}
            <button
              className="btn btn-danger px-5 fw-bold shadow-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default StudentProfile;

import React, { useState, useEffect, useRef } from "react";
// useState  -> to store and update form values
// useEffect -> to load/fetch data when component loads
// useRef    -> to access DOM element directly (file input)

import Logo from "../../assets/Logo.png"; 
// Institute logo for header

import AvatarDefault from "../../assets/teacher.png";
// Default teacher profile image

import { FaCamera } from "react-icons/fa";
// Camera icon for Change Photo option

import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> required to show toast messages on screen
// toast -> functions like toast.success(), toast.error()

import "react-toastify/dist/ReactToastify.css";
// react-toastify default styling

const TeacherProfile = () => {

  // formData stores all teacher profile fields
  const [formData, setFormData] = useState({
    firstName: "",
    designation: "",
    email: "",
    mobile: "",
    password: "",
    active: true,
  });

  // backupData stores old data so we can restore on Cancel button
  const [backupData, setBackupData] = useState(null);

  // avatar stores selected image preview (temporary)
  const [avatar, setAvatar] = useState(null);

  // useRef is used to open file selector when user clicks photo section
  const fileInputRef = useRef(null);

  // useEffect runs only once when component loads (component mount)
  useEffect(() => {

    // Dummy fetched data (in real app comes from backend API)
    const fetchedData = {
      firstName: "Prathmesh",
      designation: "Senior Teacher",
      email: "prathmesh@gmail.com",
      mobile: "9876543210",
      password: "password123",
      active: true,
    };

    // Set fetched data in form
    setFormData(fetchedData);

    // Save a backup copy for Cancel option
    setBackupData(fetchedData);
  }, []);

  // handleChange function updates formData dynamically
  // e.target.name = input field name
  // e.target.value = new value user entered
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleFileChange is called when user selects image file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // URL.createObjectURL -> creates temporary preview of selected image
      setAvatar(URL.createObjectURL(e.target.files[0]));

      // show success toast message
      toast.success("Image selected successfully");
    }
  };

  // handleUpdate runs when user clicks Update button
  const handleUpdate = () => {

    // basic validation check
    if (!formData.firstName || !formData.email || !formData.mobile) {
      toast.error("Please fill in Name, Email, and Mobile fields.");
      return;
    }

    // if validation passed, show success message
    toast.success("Profile updated successfully!");

    // update backupData with updated details
    setBackupData(formData);
  };

  // handleCancel restores old form data
  const handleCancel = () => {
    if (backupData) {
      // restore old saved data
      setFormData(backupData);

      // reset selected avatar preview
      setAvatar(null);

      // show info message
      toast.info("Changes discarded");
    }
  };

  return (
    <>
      {/* Toast container for showing toast popup messages */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header section */}
      <div className="page-header">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} className="me-3" />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>Profile</h4>
      </div>

      {/* Center aligned card */}
      <div className="d-flex justify-content-center">
        <div className="card card-custom p-5 w-100" style={{ maxWidth: "850px" }}>
          
          {/* Profile image and basic info section */}
          <div className="text-center border-bottom pb-4 mb-4">

            {/* Profile image container */}
            <div 
              className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm position-relative" 
              style={{ 
                width: '110px', 
                height: '110px', 
                overflow: 'hidden', 
                border: '4px solid #fff',
                cursor: 'pointer' 
              }}
              // when clicked it opens file selector
              onClick={() => fileInputRef.current.click()}
            >
               {/* Show selected avatar else default avatar */}
               <img 
                 src={avatar || AvatarDefault} 
                 alt="Profile" 
                 className="w-100 h-100 object-fit-cover" 
               />
            </div>

            {/* Change photo option */}
            <div 
              className="mb-3 text-primary small fw-bold" 
              style={{ cursor: 'pointer' }}
              // on click open file selector
              onClick={() => fileInputRef.current.click()}
            >
               <FaCamera className="me-1" /> Change Photo
            </div>

            {/* Hidden input for file selection */}
            <input 
              type="file" 
              ref={fileInputRef} 
              hidden 
              accept="image/*"
              onChange={handleFileChange} 
            />

            {/* Display teacher name */}
            <h4 className="fw-bold text-dark mb-1">
              {formData.firstName || "Teacher Name"}
            </h4>

            {/* Static ID */}
            <p className="text-muted">ID: 7673467</p>
          </div>

          {/* Section Title */}
          <h5 className="text-center text-muted mb-4 small fw-bold text-uppercase">
            Personal Information
          </h5>

          {/* Form fields section */}
          <div className="row g-4">

            {/* Name Field */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">Name</label>
              <input 
                type="text" 
                name="firstName" 
                className="form-control" 
                value={formData.firstName} 
                onChange={handleChange} 
              />
            </div>

            {/* Designation Field */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">Designation</label>
              <input 
                type="text" 
                name="designation" 
                className="form-control" 
                value={formData.designation} 
                onChange={handleChange} 
              />
            </div>

            {/* Email Field */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">Email</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            {/* Mobile Field */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">Mobile</label>
              <input 
                type="text" 
                name="mobile" 
                className="form-control" 
                value={formData.mobile} 
                onChange={handleChange} 
              />
            </div>

            {/* Password Field */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">Password</label>
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
            
            {/* Status display (Active/Inactive badge) */}
            <div className="col-md-6">
              <label className="form-label small text-muted fw-bold">Status</label>
              <div>
                <span 
                  // badge color depends on active boolean
                  className={`badge rounded-pill ${formData.active ? 'bg-success' : 'bg-danger'} px-3 py-2`}
                  style={{ userSelect: 'none', opacity: 0.8 }}
                >
                  {/* display active/inactive based on boolean */}
                  {formData.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

          </div>

          {/* Buttons Section */}
          <div className="d-flex justify-content-center gap-3 mt-5">

            {/* Update button */}
            <button 
              className="btn btn-navy px-5 fw-bold shadow-sm" 
              style={{ backgroundColor: '#1a237e', color: 'white' }} 
              onClick={handleUpdate}
            >
              Update
            </button>

            {/* Cancel button */}
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

export default TeacherProfile;
// exporting component so it can be used in routing or other files

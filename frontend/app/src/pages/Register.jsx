// Import React and useState hook to manage form state
import React, { useState } from "react";

// useNavigate is used for redirecting users programmatically
import { useNavigate } from "react-router-dom";

// Toast notifications for success/error messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Institute logo
import Logo from "../assets/Logo.png"; 

// Back arrow icon
import { FaArrowLeft } from "react-icons/fa";

// Register functional component
const Register = () => {

  // navigate helps in routing after successful registration
  const navigate = useNavigate();

  // Single state object to store entire form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student",      // default role
    password: "",
    confirmPassword: ""
  });

  // Common change handler for all inputs
  // Uses input 'name' attribute to update correct field
  const handleChange = (e) => {
    setFormData({
      ...formData,                 // keep previous values
      [e.target.name]: e.target.value  // update changed field
    });
  };

  // Function executed when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // Password and confirm password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // BACKEND CONNECTION (future)
    // axios.post('/api/auth/register', formData)

    // Show success message
    toast.success("Account Created Successfully!");

    // Redirect to login after short delay
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Full screen layout */}
      <div className="d-flex vh-100">

        {/* ================= LEFT SIDE (Brand Section) ================= */}
        <div className="d-flex flex-column justify-content-center align-items-center bg-white col-md-5 p-5">
          
          {/* Institute Logo */}
          <img src={Logo} alt="Logo" width={120} className="mb-4" />

          {/* Institute Name */}
          <h2 
            className="fw-bold text-center" 
            style={{ color: "#1f2b70" }}
          >
            INSTITUTE<br/>MANAGEMENT SYSTEM
          </h2>
        </div>

        {/* ================= RIGHT SIDE (Register Form) ================= */}
        <div 
          className="d-flex flex-column justify-content-center px-5 col-md-7" 
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
            
            {/* Page Title */}
            <h3 className="fw-bold mb-4">Create New Account</h3>

            {/* Access warning */}
            <p className="small mb-4 text-white-50">
              Authorized Admin Access Only
            </p>
            
            {/* Registration Form */}
            <form onSubmit={handleSubmit}>

              {/* ===== FULL NAME ===== */}
              <div className="mb-3">
                <label className="fw-bold mb-1">Full Name</label>
                <input 
                  name="fullName"                 // key for state update
                  className="form-control border-0 py-2" 
                  placeholder="Enter Name" 
                  onChange={handleChange}         // shared handler
                  required 
                />
              </div>

              {/* ===== EMAIL ===== */}
              <div className="mb-3">
                <label className="fw-bold mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control border-0 py-2" 
                  placeholder="Enter Email" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* ===== ROLE ASSIGNMENT ===== */}
              <div className="mb-3">
                <label className="fw-bold mb-1">Assign Role</label>
                <select 
                  name="role" 
                  className="form-select border-0 py-2" 
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* ===== PASSWORD & CONFIRM PASSWORD ===== */}
              <div className="row">

                {/* Password */}
                <div className="col-md-6 mb-3">
                  <label className="fw-bold mb-1">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control border-0 py-2" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                {/* Confirm Password */}
                <div className="col-md-6 mb-3">
                  <label className="fw-bold mb-1">Confirm</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    className="form-control border-0 py-2" 
                    placeholder="Confirm" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              {/* ===== SUBMIT BUTTON ===== */}
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2 fw-bold mb-4 shadow-sm" 
                style={{ backgroundColor: "#2563eb", border: "none" }}
              >
                CREATE ACCOUNT
              </button>

              {/* ===== BACK TO LOGIN ===== */}
              <div className="text-center">
                <span 
                  className="text-white text-decoration-none small" 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  <FaArrowLeft className="me-2" /> Back to Login
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

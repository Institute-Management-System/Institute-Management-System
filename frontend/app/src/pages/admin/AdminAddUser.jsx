import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
// Hook for navigation (redirecting users)
import { useNavigate } from "react-router-dom";
// Library for displaying popup notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  // Initialize the navigation hook to allow moving between pages
  const navigate = useNavigate();

  // State object to hold all form input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student", // Default role selection
    password: "",
  });

  // Function to handle changes in input fields
  // It updates the specific field in the state based on the input's 'name' attribute
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page

    // Simple Validation: Check if all fields have data
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields"); // Show error notification
      return; // Stop execution if validation fails
    }

    // Log the data to console (simulating an API call)
    console.log("User Data:", formData);
    
    // Show success notification
    toast.success(`New ${formData.role} created successfully!`);
    
    // Reset the form fields to empty after successful submission
    setFormData({
      fullName: "",
      email: "",
      role: "student",
      password: "",
    });
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section: Contains Logo, Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Add New User</h3>
        </div>
        {/* Navigation Button: navigate(-1) goes back to the previous page in history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      {/* Main Content Area: Centered Card */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "800px", backgroundColor: "#f8f9fa" }}>
          <h5 className="text-center text-muted mb-4 fw-bold text-uppercase">
            User Information
          </h5>

          {/* User Input Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              
              {/* Full Name Input */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Full Name</label>
                <input
                  type="text"
                  name="fullName" // Matches key in formData state
                  className="form-control"
                  placeholder="Enter Name"
                  value={formData.fullName} // Controlled component: value comes from state
                  onChange={handleChange} // Updates state on typing
                  required
                />
              </div>

              {/* Email Address Input */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Email Address</label>
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

              {/* Role Dropdown Selection */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Assign Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Password Input */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Initial Password</label>
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

              {/* Submit Button */}
              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 rounded-pill fw-bold"
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* ToastContainer: Required component to render the toast notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddUser;
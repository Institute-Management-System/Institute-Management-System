// Import React and useState hook
import React, { useState } from "react";

// Import logo image
import Logo from "../../assets/Logo.png";

// Hook for navigation
import { useNavigate } from "react-router-dom";

// Toast notification imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin Add Teacher Component
const AdminAddTeacher = () => {

  // Navigation hook
  const navigate = useNavigate();

  // State to store teacher form data
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    joiningDate: "",
    address: "",
    gender: "",
    status: true,
  });

  // Handle input changes for text, select, and checkbox
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setTeacher({ ...teacher, [e.target.name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log teacher data (for testing / backend integration)
    console.log("Teacher Data:", teacher);

    // Show success toast
    toast.success("Teacher Added Successfully!");

    // Reset form after submission
    setTeacher({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      dob: "",
      joiningDate: "",
      address: "",
      gender: "",
      status: true,
    });
  };

  return (
    <div className="container-fluid p-0">

      {/* Header Section */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          {/* Logo */}
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Add Teacher</h3>
        </div>

        {/* Back Button */}
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </header>

      {/* Form Container */}
      <div className="container mt-5 d-flex justify-content-center">
        <div
          className="card shadow-sm p-4 w-100"
          style={{ maxWidth: "900px", backgroundColor: "#f8f9fa" }}
        >

          {/* Teacher Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* First Name */}
              <div className="col-md-6">
                <label className="form-label fw-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={teacher.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={teacher.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={teacher.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={teacher.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={teacher.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Joining Date */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  className="form-control"
                  value={teacher.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={teacher.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={teacher.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status Toggle */}
              <div className="col-md-6">
                <label className="form-label fw-bold d-block">Status</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="status"
                    checked={teacher.status}
                    onChange={(e) =>
                      setTeacher({
                        ...teacher,
                        status: e.target.checked
                      })
                    }
                  />
                  <label className="form-check-label">
                    {teacher.status ? "Active" : "Inactive"}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 rounded-pill fw-bold"
                >
                  Add Teacher
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

// Export component
export default AdminAddTeacher;

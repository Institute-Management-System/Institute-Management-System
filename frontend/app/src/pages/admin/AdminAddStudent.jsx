import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddStudent = () => {
  // Initialize navigation hook for redirecting the user
  const navigate = useNavigate();

  // State to manage the student form data object
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    joiningDate: "",
    address: "",
    course: "",
    gender: "",
    status: true, // Default status is set to active
  });

  // Handler function to update state when form inputs change
  const handleChange = (e) => {
    // Determine the value based on input type (checkbox vs standard input)
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    
    // Update the specific field in the student state using the input's name attribute
    setStudent({ ...student, [e.target.name]: value });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload behavior
    console.log("Student Data:", student); // Log the captured data (Simulating API call)
    toast.success("Student Added Successfully!"); // Display success notification
    
    // Reset the form fields to their initial empty state
    setStudent({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      dob: "",
      joiningDate: "",
      address: "",
      course: "",
      gender: "",
      status: true,
    });
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section: Displays Logo, Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Add Student</h3>
        </div>
        {/* Button to navigate back to the previous page history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      {/* Main Form Container */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "900px", backgroundColor: "#f8f9fa" }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              
              {/* First Name Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={student.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={student.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={student.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Address Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={student.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Birth Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={student.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Joining Date Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  className="form-control"
                  value={student.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address Field */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={student.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Course Selection Dropdown */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Select Course</label>
                <select
                  name="course"
                  className="form-select"
                  value={student.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Course --</option>
                  <option value="PG-DAC">PG-DAC</option>
                  <option value="PG-DMC">PG-DMC</option>
                  <option value="PG-DBDA">PG-DBDA</option>
                </select>
              </div>

              {/* Gender Selection Dropdown */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={student.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status Toggle Switch (Active/Inactive) */}
              <div className="col-md-6">
                <label className="form-label fw-bold d-block">Status</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="status"
                    checked={student.status}
                    onChange={(e) => setStudent({...student, status: e.target.checked})}
                  />
                  <label className="form-check-label">
                    {student.status ? "Active" : "Inactive"}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold">
                  Add Student
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Toast Container for displaying notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminAddStudent;
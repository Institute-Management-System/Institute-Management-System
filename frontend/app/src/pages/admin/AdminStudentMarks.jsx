import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStudentMarks = () => {
  // Initialize navigation hook for page redirection
  const navigate = useNavigate();
  
  // State variables to store the selected filter criteria
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");

  // Handler function to process the search action
  const handleSearch = () => {
    // Validate that both fields are selected before proceeding
    if(!course || !subject) {
      toast.error("Please select both Course and Subject");
      return;
    }
    // Navigate to the results page (simulated route)
    navigate("/admin/students/view-marks");
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section: Contains the Logo, Page Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">View Marks</h3>
        </div>
        {/* Button to return to the previous page history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
      </header>

      {/* Main Content: Centered Card for Search Criteria */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-5 w-100" style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}>
          <h4 className="text-center fw-bold mb-4">Search Criteria</h4>

          {/* Course Selection Dropdown */}
          <div className="mb-3">
            <label className="form-label fw-bold">Course Name</label>
            <select
              className="form-select"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              <option value="PG-DAC">PG-DAC</option>
              <option value="PG-DBDA">PG-DBDA</option>
            </select>
          </div>

          {/* Subject Selection Dropdown */}
          <div className="mb-4">
            <label className="form-label fw-bold">Subject Name</label>
            <select
              className="form-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">-- Select Subject --</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          {/* Search Button to trigger validation and navigation */}
          <div className="text-center">
            <button
              className="btn btn-primary px-5 py-2 fw-bold rounded-pill"
              onClick={handleSearch}
            >
              Search Records
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast Container to display validation error messages */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminStudentMarks;
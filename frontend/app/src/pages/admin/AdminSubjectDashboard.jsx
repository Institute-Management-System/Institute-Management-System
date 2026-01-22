import React from "react";
// Import useNavigate hook to allow programmatic navigation (changing URLs)
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const AdminSubjectDashboard = () => {
  // Initialize the navigate function from the hook
  const navigate = useNavigate();

  return (
    // Main container wrapper (Bootstrap fluid container)
    <div className="container-fluid p-0">
      
      {/* Header Section: Flexbox used to separate Logo/Title from the Back button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">Subject Dashboard</h3>
        </div>
        
        {/* Back Button: navigate(-1) moves the user 1 step back in browser history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
      </header>

      {/* Main Content Area */}
      <div className="container mt-5">
        {/* Grid System: Creates a row where items are centered horizontally */}
        <div className="row g-4 justify-content-center">
          
          {/* --- Card 1: Subject List --- */}
          <div className="col-md-5">
            <div
              className="card shadow-sm border-0 p-4 text-center h-100"
              // Inline Styles: 
              // 1. cursor: pointer makes it look clickable
              // 2. backgroundColor: #e3f2fd applies a specific light blue shade
              style={{ cursor: "pointer", backgroundColor: "#e3f2fd" }}
              
              // OnClick Event: Redirects user to the subject list page
              onClick={() => navigate("/admin/subjects/list")}
            >
              <h4 className="fw-bold text-primary mb-2">Subject List</h4>
              <p className="text-muted">View all subjects, assigned courses & teachers.</p>
            </div>
          </div>

          {/* --- Card 2: Add Subject --- */}
          <div className="col-md-5">
            <div
              className="card shadow-sm border-0 p-4 text-center h-100"
              // Inline Styles: Applies a specific light green shade here
              style={{ cursor: "pointer", backgroundColor: "#e8f5e9" }}
              
              // OnClick Event: Redirects user to the subject management page
              onClick={() => navigate("/admin/subjects/manage")}
            >
              <h4 className="fw-bold text-success mb-2">Add Subject</h4>
              <p className="text-muted">Create new subjects and edit details.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminSubjectDashboard;
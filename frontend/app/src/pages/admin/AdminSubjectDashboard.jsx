import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const AdminSubjectDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">Subject Dashboard</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
      </header>

      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div
              className="card shadow-sm border-0 p-4 text-center h-100"
              style={{ cursor: "pointer", backgroundColor: "#e3f2fd" }}
              onClick={() => navigate("/admin/subjects/list")}
            >
              <h4 className="fw-bold text-primary mb-2">Subject List</h4>
              <p className="text-muted">View all subjects, assigned courses & teachers.</p>
            </div>
          </div>

          <div className="col-md-5">
            <div
              className="card shadow-sm border-0 p-4 text-center h-100"
              style={{ cursor: "pointer", backgroundColor: "#e8f5e9" }}
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
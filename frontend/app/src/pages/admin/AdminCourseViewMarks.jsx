import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCourseViewMarks = () => {
  const navigate = useNavigate();

  // State to hold marks data (simulating API data)
  const [courseMarks] = useState([
    { id: 1, course: "PG-DAC", subject: "Java", avgMarks: 78 },
    { id: 2, course: "PG-DMC", subject: "Python", avgMarks: 82 },
    { id: 3, course: "PG-DBDA", subject: "Machine Learning", avgMarks: 75 },
    { id: 4, course: "PG-DESD", subject: "Embedded C", avgMarks: 68 },
  ]);

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Course Marks Overview</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3">ID</th>
                  <th className="py-3">Course</th>
                  <th className="py-3">Subject</th>
                  <th className="py-3">Average Marks</th>
                </tr>
              </thead>
              <tbody>
                {courseMarks.length > 0 ? (
                  courseMarks.map((cm) => (
                    <tr key={cm.id}>
                      <td>{cm.id}</td>
                      <td className="fw-bold text-primary">{cm.course}</td>
                      <td>{cm.subject}</td>
                      <td>
                        <span 
                          className={`badge rounded-pill px-3 py-2 ${
                            cm.avgMarks >= 75 ? "bg-success" : "bg-warning text-dark"
                          }`}
                        >
                          {cm.avgMarks}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted py-4">
                      No marks data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminCourseViewMarks;
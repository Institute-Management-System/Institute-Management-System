import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewStudentMarks = () => {
  // Initialize navigation hook for handling page redirection
  const navigate = useNavigate();

  // State to hold the student marks data (currently initialized with mock data)
  const [marksData] = useState([
    { rollNo: 1, name: "Aarav Sharma", course: "PG-DAC", subject1: 85, subject2: 90, totalMarks: 175 },
    { rollNo: 2, name: "Diya Patel", course: "PG-DAC", subject1: 65, subject2: 55, totalMarks: 120 },
  ]);

  return (
    <div className="container-fluid p-0">
      {/* Header Section containing Logo, Page Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">Student Marks</h3>
        </div>
        {/* Button to navigate back to the previous page history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
      </header>

      {/* Main Content Area */}
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            {/* Marks Table */}
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Subject 1</th>
                  <th>Subject 2</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate through marksData to generate table rows */}
                {marksData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.rollNo}</td>
                    <td className="fw-bold">{data.name}</td>
                    <td>{data.course}</td>
                    <td>{data.subject1}</td>
                    <td>{data.subject2}</td>
                    {/* Highlight Total Marks for better visibility */}
                    <td className="fw-bold text-primary">{data.totalMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Toast Notification Container (for potential future alerts) */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminViewStudentMarks;
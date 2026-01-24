import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStudentAttendance = () => {
  // Initialize navigation hook to handle page redirection
  const navigate = useNavigate();

  // State to store attendance records (currently using mock data)
  const [attendance] = useState([
    { id: 1, name: "Aarav Sharma", course: "PG-DAC", date: "01-02-2025", status: "Present", attendance: "85%" },
    { id: 2, name: "Diya Patel", course: "PG-DMC", date: "02-03-2025", status: "Absent", attendance: "90%" },
    { id: 3, name: "Rohan Mehra", course: "PG-DBDA", date: "04-05-2025", status: "Present", attendance: "70%" },
    { id: 4, name: "Ananya Singh", course: "PG-DAC", date: "06-07-2025", status: "Present", attendance: "65%" },
    { id: 5, name: "Vikram Reddy", course: "PG-DAC", date: "01-01-2025", status: "Absent", attendance: "87%" },
  ]);

  return (
    <div className="container-fluid p-0">
      {/* Header Section: Logo, Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">Student Attendance Record</h3>
        </div>
        {/* Navigate back to previous page on click */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      {/* Main Table Container */}
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            {/* Attendance Table */}
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3">ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Course</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Overall %</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through attendance state to generate rows */}
                {attendance.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td className="fw-bold">{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.date}</td>
                    <td>
                      {/* Conditional styling for Status Badge (Green for Present, Red for Absent) */}
                      <span className={`badge rounded-pill ${student.status === "Present" ? "bg-success" : "bg-danger"}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>{student.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Toast Container for notifications (if needed in future logic) */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminStudentAttendance;
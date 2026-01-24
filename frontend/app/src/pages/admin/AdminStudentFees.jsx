import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminStudentFees = () => {
  // Initialize the navigation hook for handling page redirects
  const navigate = useNavigate();

  // State to hold student fee records (Currently initialized with mock data)
  const [students, setStudents] = useState([
    {
      cId: 1,
      name: "Aarav Sharma",
      course: "PG-DAC",
      email: "aarav.s@example.com",
      phone: "9876543210",
      fees: 90000,
      paid: true, // Indicates if the fee is fully paid
    },
    {
      cId: 2,
      name: "Diya Patel",
      course: "PG-DAC",
      email: "diya.p@example.com",
      phone: "9876543211",
      fees: 90000,
      paid: false,
    },
    {
      cId: 3,
      name: "Rohan Mehra",
      course: "PG-DMC",
      email: "rohan.m@example.com",
      phone: "9876543212",
      fees: 85000,
      paid: true,
    },
    {
      cId: 4,
      name: "Ananya Singh",
      course: "PG-DMC",
      email: "ananya.s@example.com",
      phone: "9876543213",
      fees: 85000,
      paid: false,
    },
    {
      cId: 5,
      name: "Vikram Reddy",
      course: "PG-DBDA",
      email: "vikram.r@example.com",
      phone: "9876543214",
      fees: 110000,
      paid: true,
    },
  ]);

  // Handler function to toggle the payment status (Paid <-> Pending)
  const togglePaymentStatus = (id) => {
    // Map through the students array, find the matching ID, and invert the 'paid' boolean
    setStudents(
      students.map((student) =>
        student.cId === id ? { ...student, paid: !student.paid } : student
      )
    );
    // Show a notification to the user
    toast.info("Payment status updated!");
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section: Displays Logo, Page Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Student Fees Status</h3>
        </div>
        {/* Button to navigate back to the previous page in history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      {/* Main Content Area */}
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            {/* Fees Table */}
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3">ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Course</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Fees (₹)</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Render a row for each student in the state */}
                {students.map((student) => (
                  <tr key={student.cId}>
                    <td>{student.cId}</td>
                    <td className="fw-bold">{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    {/* Format fees number to locale string (adds commas) */}
                    <td>{student.fees.toLocaleString()}</td>
                    <td>
                      {/* Action Button: Changes color and text based on payment status */}
                      <button
                        onClick={() => togglePaymentStatus(student.cId)}
                        className={`btn btn-sm rounded-pill px-3 fw-bold ${
                          student.paid ? "btn-success" : "btn-danger"
                        }`}
                        style={{ minWidth: "100px" }}
                      >
                        {student.paid ? "Paid" : "Pending"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};


export default AdminStudentFees;
import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStudentList = () => {
  // Hook for programmatic navigation (redirecting users)
  const navigate = useNavigate();

  // State to hold the list of students (currently initialized with mock data)
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Sharma", dob: "2005-04-12", gender: "Male", email: "aarav.s@example.com", phone: "9876543210", address: "Pune", admissionDate: "2023-06-15" },
    { id: 2, name: "Diya Patel", dob: "2006-08-25", gender: "Female", email: "diya.p@example.com", phone: "9876543211", address: "Mumbai", admissionDate: "2023-06-16" },
  ]);

  // Handler to remove a student from the list based on their ID
  const handleDelete = (id) => {
    // Filter out the student with the matching ID from the state array
    setStudents(students.filter(s => s.id !== id));
    // Display an error/alert toast notification
    toast.error("Student record deleted.");
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section containing Logo, Title, and Action Buttons */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">Student List</h3>
        </div>
        <div className="d-flex gap-2">
            {/* Button to navigate to the Add Student form */}
           <button className="btn btn-primary" onClick={() => navigate("/admin/students/add")}>+ Add Student</button>
           {/* Button to go back to the previous page */}
           <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            {/* Student Data Table */}
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the students state to generate table rows */}
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td className="fw-bold">{s.name}</td>
                    <td>{s.dob}</td>
                    <td>{s.gender}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>{s.address}</td>
                    <td>
                      {/* Action Buttons: Edit and Delete */}
                      <div className="d-flex justify-content-center gap-2">
                        {/* Edit Button (Placeholder) */}
                        <button className="btn btn-sm btn-outline-primary" title="Edit">
                          <i className="bi bi-pencil">Edit</i>
                        </button>
                        {/* Delete Button - Triggers handleDelete */}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)} title="Delete">
                          <i className="bi bi-trash">Delete</i>
                        </button>
                      </div>
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

export default AdminStudentList;
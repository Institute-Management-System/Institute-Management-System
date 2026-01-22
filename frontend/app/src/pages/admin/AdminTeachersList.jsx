// Import React and useState hook for managing component state
import React, { useState } from "react";

// Import logo image
import Logo from "../../assets/Logo.png";

// Hook for programmatic navigation
import { useNavigate } from "react-router-dom";

// Toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin Teachers List Component
const AdminTeachersList = () => {

  // Navigation hook
  const navigate = useNavigate();

  // State to store teachers data
  const [teachers, setTeachers] = useState([
    {
      t_id: 1,
      name: "Pooja Jaiswal",
      doj: "1995-04-12",
      gender: "Female",
      email: "pooja@gmail.com",
      phone: "8976543210",
      qual: "BE-Comp",
      address: "Pune"
    },
    {
      t_id: 2,
      name: "Nilesh Pawar",
      doj: "1997-08-25",
      gender: "Male",
      email: "nilesh@gmail.com",
      phone: "7876543211",
      qual: "BE-IT",
      address: "Mumbai"
    },
  ]);

  // Function to delete a teacher by ID
  const handleDelete = (id) => {
    // Remove teacher from state
    setTeachers(teachers.filter(t => t.t_id !== id));

    // Show toast notification
    toast.error("Teacher removed successfully");
  };

  return (
    <div className="container-fluid p-0">

      {/* Header Section */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          {/* Logo */}
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">Teachers List</h3>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/teachers/add")}
          >
            + Add Teacher
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </header>

      {/* Table Section */}
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 text-center align-middle">

              {/* Table Header */}
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>DOJ</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Qualification</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {teachers.map((t) => (
                  <tr key={t.t_id}>
                    <td>{t.t_id}</td>
                    <td className="fw-bold">{t.name}</td>
                    <td>{t.doj}</td>
                    <td>{t.gender}</td>
                    <td>{t.email}</td>
                    <td>{t.phone}</td>
                    <td>{t.qual}</td>
                    <td>{t.address}</td>
                    <td>
                      {/* Delete Button */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(t.t_id)}
                      >
                        Delete
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

// Export component
export default AdminTeachersList;

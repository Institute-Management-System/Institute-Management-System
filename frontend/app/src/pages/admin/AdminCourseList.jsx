import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
// Import hook for page navigation
import { useNavigate } from "react-router-dom";
// Import Toast components for popup notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCourseList = () => {
  // Initialize the navigate function to move between pages
  const navigate = useNavigate();

  // 'courses' state: Holds the list of course objects.
  // 'setCourses': Function to update the list (e.g., after deletion).
  // Initialized with dummy data (DAC, DBDA, DMC) for display purposes.
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "DAC",
      duration: "6 Months",
      description: "Post Graduate Diploma In Advanced Computing",
      fees: "90,000",
    },
    {
      id: 2,
      name: "DBDA",
      duration: "6 Months",
      description: "Post Graduate Diploma in Database and Big Data Analytics",
      fees: "1,15,000",
    },
    {
      id: 3,
      name: "DMC",
      duration: "6 Months",
      description: "Post Graduate Diploma In Mobile Computing",
      fees: "90,000",
    },
  ]);

  // Function to handle the deletion of a course
  const handleDelete = (id) => {
    // filter() creates a NEW array excluding the course with the matching ID
    // This updates the UI immediately because 'setCourses' triggers a re-render
    setCourses(courses.filter((course) => course.id !== id));
    
    // Show a success notification popup
    toast.info("Course deleted successfully!");
  };

  return (
    // Main container
    <div className="container-fluid p-0">
      
      {/* Header Section: Logo, Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">Course List</h3>
        </div>
        {/* Navigates back one step in browser history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      {/* Main Content */}
      <div className="container mt-4">
        
        {/* Top bar with 'Add New Course' button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary fw-bold"
            // FIXED: Path changed from /admin/course/add to /admin/courses/add
            // Navigates to the "Add Course" form page
            onClick={() => navigate("/admin/courses/add")} 
          >
            + Add New Course
          </button>
        </div>

        {/* Card containing the Data Table */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle text-center">
              
              {/* Table Header */}
              <thead className="table-light">
                <tr>
                  <th className="py-3">ID</th>
                  <th className="py-3">Course Name</th>
                  <th className="py-3">Duration</th>
                  <th className="py-3 text-start">Description</th>
                  <th className="py-3">Fees (₹)</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {/* Conditional Rendering: Check if there are courses in the list */}
                {courses.length > 0 ? (
                  // If courses exist, map through the array and create a row (tr) for each
                  courses.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td className="fw-bold">{c.name}</td>
                      <td>{c.duration}</td>
                      <td className="text-start">{c.description}</td>
                      <td>{c.fees}</td>
                      <td>
                        {/* Delete Button */}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          // When clicked, calls handleDelete with the specific course ID
                          onClick={() => handleDelete(c.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  // If the list is empty (length is 0), show this row instead
                  <tr>
                    <td colSpan="6" className="text-muted py-4">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Container required for the toast notifications to appear */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminCourseList;
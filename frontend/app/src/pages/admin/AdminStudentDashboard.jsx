// Import React library
import React from "react";

// Import logo image
import Logo from "../../assets/Logo.png";

// Import navigation hook from react-router
import { useNavigate } from "react-router-dom";

// Admin Student Dashboard Component
const AdminStudentDashboard = () => {

  // Hook used to navigate between routes
  const navigate = useNavigate();

  // Dashboard card configuration
  // Each object represents one card with title, route path, and color
  const cards = [
    {
      title: "View Student",
      path: "/admin/students/list",
      color: "bg-primary"
    },
    {
      title: "Add Student",
      path: "/admin/students/add",
      color: "bg-success"
    },
    {
      title: "View Marks",
      path: "/admin/students/marks",
      color: "bg-info"
    },
    {
      title: "Feedback",
      path: "/admin/feedbacks", 
      color: "bg-warning"
    },
    {
      title: "Fees Paid",
      path: "/admin/fees",
      color: "bg-danger"
    },
    {
      title: "Student Attendance",
      path: "/admin/students/attendance",
      color: "bg-secondary"
    },
  ];

  return (
    // Main container (full width, no padding)
    <div className="container-fluid p-0">

      {/* HEADER SECTION */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        
        {/* Logo and title */}
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">Student Management</h3>
        </div>

        {/* Back button navigates to previous page */}
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </header>

      {/* DASHBOARD CARDS GRID */}
      <div className="container mt-5">
        <div className="row g-4 justify-content-center">

          {/* Loop through cards array to render each card */}
          {cards.map((card, index) => (
            <div key={index} className="col-md-4 col-sm-6">

              {/* Individual card */}
              <div 
                className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow"
                style={{ cursor: "pointer", transition: "0.3s" }}

                // Navigate to the specified path on click
                onClick={() => navigate(card.path)}

                // Add hover animation (move up)
                onMouseEnter={(e) => 
                  e.currentTarget.style.transform = "translateY(-5px)"
                }

                // Remove hover animation
                onMouseLeave={(e) => 
                  e.currentTarget.style.transform = "translateY(0)"
                }
              >
                {/* Card title */}
                <h5 className="fw-bold text-dark">{card.title}</h5>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export component
export default AdminStudentDashboard;

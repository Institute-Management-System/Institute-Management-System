import React from "react";
import Logo from "../../assets/Logo.png";
// Import useNavigate hook to handle navigation programmatically
import { useNavigate } from "react-router-dom";

const AdminTeacherDashboard = () => {
  // Initialize the navigate function to change routes
  const navigate = useNavigate();

  // Define an array of objects representing the dashboard options.
  // Each object holds the title, the route path, and a background color class.
  const cards = [
    { title: "View Teacher", path: "/admin/teachers/list", color: "bg-primary" },
    { title: "Add Teacher", path: "/admin/teachers/add", color: "bg-success" },
    { title: "Teacher Attendance", path: "/admin/teachers/attendance", color: "bg-info" },
    // Removed Feedback Card
  ];

  return (
    // Main container wrapper (Bootstrap fluid container)
    <div className="container-fluid p-0">
      
      {/* Header Section: Includes Logo, Page Title, and Back Button */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          {/* Displaying the Logo image */}
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">Teacher Management</h3>
        </div>
        
        {/* Back Button: Uses navigate(-1) to return to the previous page in history */}
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
      </header>

      {/* Main Content Area: Displays the grid of clickable cards */}
      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          
          {/* Loop through the 'cards' array to render a card component for each item */}
          {cards.map((card, index) => (
            <div key={index} className="col-md-5 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-5 text-center"
                // Inline styles for interaction feedback (cursor) and smooth animation
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                
                // Event Handler: Navigates to the specific path when clicked
                onClick={() => navigate(card.path)}
                
                // Animation: Scales the card up slightly (1.02x) when hovered
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                
                // Animation: Returns card to normal size when mouse leaves
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {/* Render the title of the card */}
                <h4 className="fw-bold">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherDashboard;
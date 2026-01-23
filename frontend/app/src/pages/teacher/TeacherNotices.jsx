// React imports: useState for state management, useEffect for lifecycle (fetching data on load)
import React, { useState, useEffect } from "react";

// Importing logo image for header UI
import Logo from "../../assets/Logo.png";

// Importing bell icon for Notice Board title
import { FaBell } from "react-icons/fa";

// Toast notifications container
import { ToastContainer } from "react-toastify";

// Default toastify CSS
import "react-toastify/dist/ReactToastify.css";

const TeacherNotices = () => {
  // State to store notices data
  const [notices, setNotices] = useState([]);

  // useEffect runs once when component loads (because dependency array is empty [])
  useEffect(() => {
    // Dummy fetched data (later you can replace this with API call)
    const fetchedData = [
      {
        id: 1, // Unique notice ID
        title: "Holiday Announcement", // Notice title
        date: "17 Oct 2025", // Date of notice
        description:
          "The college will observe a holiday on October 18th for Diwali celebrations." // Full notice description
      },
      {
        id: 2,
        title: "Exam Schedule Update",
        date: "23 Oct 2025",
        description:
          "The semester exam schedule has been revised. Exams will be conducted on 24 Oct."
      },
      {
        id: 3,
        title: "Faculty Meeting",
        date: "23 Oct 2025",
        description:
          "Mandatory faculty meeting on 25th October 2025 at the Conference Hall regarding accreditation."
      },
      {
        id: 4,
        title: "Sports Fest Registration",
        date: "25 Oct 2025",
        description:
          "Inter-college Sports Fest starts next week. Please submit student participant lists."
      }
    ];

    // Setting fetched notices data into state
    setNotices(fetchedData);
  }, []);

  return (
    <>
      {/* Toast notifications will appear in the top-right corner */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page header section containing logo and title */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        {/* Institute logo */}
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />

        {/* Page title */}
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          Notices
        </h4>
      </div>

      {/* Main card container for notice board */}
      <div className="card card-custom p-4">
        {/* Notice board heading with icon */}
        <h5
          className="fw-bold mb-4 d-flex align-items-center gap-2"
          style={{ color: "#1a237e" }}
        >
          {/* Bell icon */}
          <FaBell /> Notice Board
        </h5>

        {/* Wrapper for listing notices */}
        <div className="d-flex flex-column gap-3">
          {/* If notices exist, map and show each notice card */}
          {notices.length > 0 ? (
            notices.map((n) => (
              // Each notice card (key required for React list rendering)
              <div key={n.id} className="notice-card">
                {/* Notice title + date section */}
                <div
                  className="mb-2 ps-3"
                  style={{ borderLeft: "4px solid #1a237e" }}
                >
                  {/* Notice title */}
                  <div className="fw-bold text-dark">{n.title}</div>

                  {/* Notice date */}
                  <div className="small text-muted">{n.date}</div>
                </div>

                {/* Notice description box */}
                <div className="bg-light p-3 rounded border text-secondary small shadow-sm">
                  {n.description}
                </div>
              </div>
            ))
          ) : (
            // If no notices available
            <p className="text-muted text-center py-4">
              No new notices available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

// Exporting component so it can be used in other files
export default TeacherNotices;

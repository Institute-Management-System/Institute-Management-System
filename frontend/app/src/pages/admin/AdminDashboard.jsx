import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
// Importing specific icons from react-icons for visual representation in the UI
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaInfoCircle } from "react-icons/fa";

const AdminDashboard = () => {
  /* STATE MANAGEMENT:
     'stats' holds the numeric data cards.
     'notices' holds the list of announcements.
     Using state ensures the UI updates automatically when data is fetched.
  */
  const [stats, setStats] = useState([]);
  const [notices, setNotices] = useState([]);

  /* SIDE EFFECT (Mounting):
     useEffect with an empty dependency array [] mimics 'componentDidMount'.
     This is where you would typically perform an API call (fetch/axios).
  */
  useEffect(() => {
    // Mock Data representing what would normally come from a REST API
    const backendStats = [
      { title: "TOTAL STUDENTS", value: "1200", subtext: "Enrolled in various programs" },
      { title: "TOTAL TEACHERS", value: "50", subtext: "Active faculty members" },
      { title: "TOTAL COURSES", value: "25", subtext: "Active curriculum" }
    ];

    const backendNotices = [
      { id: 1, title: "Holiday Announcement", date: "17 Oct 2025", desc: "The college will observe a holiday on October 18th for Diwali celebrations." },
      { id: 2, title: "Exam Schedule Update", date: "23 Oct 2025", desc: "Semester exams will be conducted starting 24th Oct." },
      { id: 3, title: "Faculty Meeting", date: "23 Oct 2025", desc: "Mandatory meeting on 25th October 2025 at Conference Hall." },
      { id: 4, title: "Sports Fest", date: "25 Oct 2025", desc: "Inter-college Sports Fest registration closes soon." }
    ];

    // Updating state variables to trigger a re-render with the new data
    setStats(backendStats);
    setNotices(backendNotices);
  }, []);

  /* HELPER FUNCTION: getStatStyle
     This implements a "Strategy Pattern" to dynamically assign icons and colors 
     based on the stat title, keeping the JSX clean and readable.
  */
  const getStatStyle = (title) => {
    switch (title) {
      case "TOTAL STUDENTS":
        return { icon: <FaUserGraduate />, bg: "bg-primary bg-opacity-10", color: "text-primary" };
      case "TOTAL TEACHERS":
        return { icon: <FaChalkboardTeacher />, bg: "bg-success bg-opacity-10", color: "text-success" };
      case "TOTAL COURSES":
        return { icon: <FaBook />, bg: "bg-warning bg-opacity-10", color: "text-warning" };
      default:
        return { icon: <FaInfoCircle />, bg: "bg-secondary bg-opacity-10", color: "text-secondary" };
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* HEADER SECTION:
          Uses Bootstrap utility classes for layout (d-flex) and spacing (p-3, mb-0).
      */}
      <header className="d-flex align-items-center p-3 bg-white border-bottom shadow-sm">
        <img src={Logo} alt="Logo" width={45} className="me-3" />
        <h3 className="mb-0 fw-bold" style={{ color: "#2e335b" }}>INSTITUTE MANAGEMENT SYSTEM</h3>
      </header>

      <div className="container mt-4">
        <div className="row g-4">
          
          {/* LEFT COLUMN - STATS CARDS:
              Uses .map() to iterate over the 'stats' array to render components dynamically.
          */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-3">
              {stats.map((stat, index) => {
                // Get style config for each specific card type
                const style = getStatStyle(stat.title);
                return (
                  <div key={index} className="card shadow-sm border-0 p-4 hover-shadow transition-all">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-secondary fw-bold small text-uppercase mb-2">{stat.title}</h6>
                        <h2 className="fw-bold mb-1 text-dark">{stat.value}</h2>
                        <small className="text-muted">{stat.subtext}</small>
                      </div>
                      {/* Dynamic styling applied via template literals and style object */}
                      <div 
                        className={`d-flex align-items-center justify-content-center rounded-3 ${style.bg} ${style.color}`} 
                        style={{ width: '60px', height: '60px', fontSize: '1.75rem' }}
                      >
                        {style.icon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN - NOTICES BOARD:
              Includes a scrollable area for long lists of announcements.
          */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 h-100 p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark border-bottom pb-3">
                <FaInfoCircle className="text-primary" /> Recent Notices
              </h5>

              {/* Scrollable container for UX efficiency */}
              <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: "600px" }}>
                {notices.map((n) => (
                  <div key={n.id} className="p-3 rounded bg-light border-start border-4 border-primary shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold text-dark mb-0">{n.title}</h6>
                      <span className="badge bg-white text-primary border">{n.date}</span>
                    </div>
                    <p className="text-muted small mb-0">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
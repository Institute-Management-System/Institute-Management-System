// Import React and required hooks
import React, { useState, useEffect } from 'react';

// Import icons used in dashboard cards and notices
import { 
  FaUserFriends, 
  FaBookOpen, 
  FaClock, 
  FaInfoCircle, 
  FaCalendarAlt 
} from 'react-icons/fa';

// StudentDashboard component
const StudentDashboard = () => {

  // stats: stores dashboard summary cards (courses, subjects, attendance)
  const [stats, setStats] = useState([]);

  // notices: stores notice board items
  const [notices, setNotices] = useState([]);

  // useEffect runs once when component loads (componentDidMount equivalent)
  useEffect(() => {

    // Dummy data simulating backend response for statistics
    const backendStats = [
      { title: "COURSES", value: "5", desc: "Enrolled courses" },
      { title: "SUBJECTS", value: "12", desc: "Total subjects" },
      { title: "ATTENDANCE", value: "85%", desc: "Average attendance" }
    ];

    // Dummy data simulating backend response for notices
    const backendNotices = [
      { id: 1, title: "Semester Exams", date: "2025-10-24", desc: "Final semester exams schedule has been released." },
      { id: 2, title: "Diwali Holiday", date: "2025-11-01", desc: "College remains closed for 3 days." },
      { id: 3, title: "Project Submission", date: "2025-11-05", desc: "Final year project submission deadline." },
      { id: 4, title: "Guest Lecture", date: "2025-12-10", desc: "Guest lecture on AI by Dr. Smith." }
    ];

    // Setting data into state (triggers re-render)
    setStats(backendStats);
    setNotices(backendNotices);

  }, []); // Empty dependency array → runs only once

  // Returns icon and styling based on stat title
  const getStatStyle = (title) => {
    switch (title) {
      case "COURSES":
        return { 
          icon: <FaUserFriends />, 
          bg: "#e0f2fe", 
          color: "#0284c7" 
        };
      case "SUBJECTS":
        return { 
          icon: <FaBookOpen />, 
          bg: "#dcfce7", 
          color: "#16a34a" 
        };
      case "ATTENDANCE":
        return { 
          icon: <FaClock />, 
          bg: "#ffedd5", 
          color: "#ea580c" 
        };
      default:
        return { 
          icon: <FaInfoCircle />, 
          bg: "#f3f4f6", 
          color: "#4b5563" 
        };
    }
  };

  return (
    <div className="container-fluid p-0">

      {/* Page Header */}
      <div className="mb-4">
        <h4 className="fw-bold" style={{ color: '#1e293b' }}>
          Student Dashboard
        </h4>
        <p className="text-muted small">
          Welcome back, here is your daily overview.
        </p>
      </div>

      {/* Main Grid */}
      <div className="row g-4">
        
        {/* ================= LEFT SIDE (Stats Cards) ================= */}
        <div className="col-lg-5 d-flex flex-column gap-3">

          {/* Loop through stats */}
          {stats.map((stat, index) => {

            // Get style for current stat
            const style = getStatStyle(stat.title); 
            
            return (
              <div 
                key={index} 
                className="card border-0 shadow-sm p-4" 
                style={{ borderRadius: '12px' }}
              >
                <div className="d-flex justify-content-between align-items-center">

                  {/* Stat text */}
                  <div>
                    <h6 className="text-muted fw-bold text-uppercase small mb-2">
                      {stat.title}
                    </h6>
                    <h2 className="fw-bold mb-1 text-dark">
                      {stat.value}
                    </h2>
                    <small className="text-secondary">
                      {stat.desc}
                    </small>
                  </div>

                  {/* Stat icon */}
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle" 
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: style.bg, 
                      color: style.color,
                      fontSize: '1.5rem'
                    }}
                  >
                    {style.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT SIDE (Notice Board) ================= */}
        <div className="col-lg-7">
          <div 
            className="card border-0 shadow-sm h-100 p-4" 
            style={{ borderRadius: '12px' }}
          >

            {/* Notice Board Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <h5 
                className="fw-bold mb-0 d-flex align-items-center gap-2" 
                style={{ color: '#1e293b' }}
              >
                <FaInfoCircle className="text-primary" /> Notice Board
              </h5>
              <span className="badge bg-light text-dark border">
                Latest Updates
              </span>
            </div>
            
            {/* Notices List */}
            <div className="d-flex flex-column gap-3">

              {/* Loop through notices */}
              {notices.map((notice, i) => {

                // Convert date string to Date object
                const dateObj = new Date(notice.date);

                // Extract day and month
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString('default', { month: 'short' });

                return (
                  <div key={i} className="d-flex gap-3">

                    {/* Date Box */}
                    <div 
                      className="d-flex flex-column align-items-center justify-content-center rounded p-2 text-white shadow-sm"
                      style={{ 
                        minWidth: '70px', 
                        height: '70px', 
                        backgroundColor: '#1f2b70' 
                      }}
                    >
                      <span className="h4 fw-bold mb-0">{day}</span>
                      <small 
                        className="text-uppercase" 
                        style={{ fontSize: '10px' }}
                      >
                        {month}
                      </small>
                    </div>

                    {/* Notice Content */}
                    <div>
                      <h6 className="fw-bold text-dark mb-1">
                        {notice.title}
                      </h6>
                      <p className="text-muted small mb-0">
                        {notice.desc}
                      </p>
                      <small className="text-primary" style={{ fontSize: '0.8rem' }}>
                        <FaCalendarAlt className="me-1"/> {notice.date}
                      </small>
                    </div>
                  </div>
                );
              })}

              {/* Empty State */}
              {notices.length === 0 && (
                <p className="text-muted text-center">
                  No notices found.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;

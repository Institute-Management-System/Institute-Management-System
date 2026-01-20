import React, { useState, useEffect } from "react"; 
// React import + hooks:
// useState = to store data in state
// useEffect = to run code automatically when component loads

import Logo from "../../assets/Logo.png"; 
// Importing institute logo image

import { FaUserGraduate, FaMoneyBillWave, FaClipboardCheck, FaInfoCircle } from "react-icons/fa";
// Importing icons from react-icons library

const TeacherDashboard = () => {
  // stats = cards data (total students, salary, attendance)
  // notices = list of recent notices
  const [stats, setStats] = useState([]);
  const [notices, setNotices] = useState([]);

  // useEffect runs once when component mounts (page loads)
  useEffect(() => {
    // Dummy backend data (later you will fetch from API)
    const backendStats = [
      { title: "TOTAL STUDENTS", value: "500", subtext: "Enrolled in particular subject" },
      { title: "SALARY", value: "50,000", subtext: "Credited for this month" },
      { title: "ATTENDANCE", value: "75/100", subtext: "Average Class Attendance" }
    ];

    // Dummy backend notices data
    const backendNotices = [
      { id: 1, title: "Holiday Announcement", date: "17 Oct 2025", desc: "The college will observe a holiday on October 18st for Diwali celebrations." },
      { id: 2, title: "Exam Schedule Update", date: "23 Oct 2025", desc: "Exam will be conducted on 24 Oct." },
      { id: 3, title: "Faculty meeting", date: "23 Oct 2025", desc: "Faculty meeting on 25th October 2025 at Conference Hall." },
      { id: 4, title: "Sports Fest", date: "25 Oct 2025", desc: "Inter-college Sports Fest starts on 25th October 2025." }
    ];

    // Setting data into state
    setStats(backendStats);
    setNotices(backendNotices);
  }, []); 
  // Empty dependency array [] means run only once on first render

  // This function returns styling based on the stat title
  // It helps in showing different icons + background colors
  const getStatStyle = (title) => {
    switch (title) {
      case "TOTAL STUDENTS":
        return { icon: <FaUserGraduate />, bg: "#e0f2fe", color: "#0284c7" };
      case "SALARY":
        return { icon: <FaMoneyBillWave />, bg: "#dcfce7", color: "#16a34a" };
      case "ATTENDANCE":
        return { icon: <FaClipboardCheck />, bg: "#ffedd5", color: "#ea580c" };
      default:
        return { icon: <FaInfoCircle />, bg: "#f3f4f6", color: "#4b5563" };
    }
  };

  return (
    <>
      {/* Top Header Section */}
      <div className="page-header mb-4 d-flex align-items-center">
        {/* Institute Logo */}
        <img src={Logo} alt="Logo" style={{ width: "40px" }} className="me-3" />

        {/* Institute Title */}
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          INSTITUTE MANAGEMENT SYSTEM
        </h4>
      </div>

      {/* Main Layout Row */}
      <div className="row g-4">

        {/* Left Side: Stat Cards (TOTAL STUDENTS, SALARY, ATTENDANCE) */}
        <div className="col-lg-5 d-flex flex-column gap-3">
          {stats.map((stat, index) => {
            // Get icon, background color, and icon color based on title
            const style = getStatStyle(stat.title);

            return (
              <div key={index} className="card card-custom p-4">
                <div className="d-flex justify-content-between align-items-center">

                  {/* Left side: Title + value + subtext */}
                  <div>
                    <h6 className="text-muted fw-bold small text-uppercase">
                      {stat.title}
                    </h6>
                    <h2 className="fw-bold mb-0 text-dark">{stat.value}</h2>
                    <small className="text-muted">{stat.subtext}</small>
                  </div>

                  {/* Right side: Icon box */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: style.bg, // background color from getStatStyle
                      color: style.color,        // icon color from getStatStyle
                      fontSize: "1.5rem"         // icon size
                    }}
                  >
                    {style.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Notices Section */}
        <div className="col-lg-7">
          <div className="card card-custom h-100 p-4">

            {/* Notice Header */}
            <h5
              className="fw-bold mb-4 d-flex align-items-center gap-2"
              style={{ color: "#1a237e" }}
            >
              <FaInfoCircle /> Recent Notices
            </h5>

            {/* Notice List */}
            <div className="d-flex flex-column gap-3">
              {notices.map((n) => (
                <div key={n.id} className="notice-card">

                  {/* Notice Title Row */}
                  <div
                    className="d-flex justify-content-between align-items-center mb-2 ps-2"
                    style={{ borderLeft: "4px solid #1a237e" }} // left blue border
                  >
                    {/* Notice title */}
                    <div className="fw-bold text-dark ms-2">{n.title}</div>

                    {/* Notice date */}
                    <div className="small text-muted">{n.date}</div>
                  </div>

                  {/* Notice Description */}
                  <div className="bg-light p-3 rounded text-secondary small">
                    {n.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
// Exporting component so it can be used in routing/pages

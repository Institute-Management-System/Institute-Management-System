import React from "react";
import Logo from "../../assets/Logo.png";
import { FaUserGraduate, FaMoneyBillWave, FaClipboardCheck, FaInfoCircle } from "react-icons/fa";

const TeacherDashboard = () => {
  return (
    <>
      {/* Header Card */}
      <div className="page-header">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} className="me-3" />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>INSTITUTE MANAGEMENT SYSTEM</h4>
      </div>

      <div className="row g-4">
        {/* Left Column: Stats */}
        <div className="col-lg-5 d-flex flex-column gap-3">
          
          {/* Card 1 */}
          <div className="card card-custom p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted fw-bold small text-uppercase">Total Students</h6>
                <h2 className="fw-bold mb-0 text-dark">500</h2>
                <small className="text-muted">Enrolled in particular subject</small>
              </div>
              <div className="icon-box" style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}>
                <FaUserGraduate />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card card-custom p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted fw-bold small text-uppercase">Salary</h6>
                <h2 className="fw-bold mb-0 text-dark">50,000</h2>
              </div>
              <div className="icon-box" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                <FaMoneyBillWave />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card card-custom p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted fw-bold small text-uppercase">Attendance</h6>
                <h2 className="fw-bold mb-0 text-dark">75/100</h2>
              </div>
              <div className="icon-box" style={{ backgroundColor: "#ffedd5", color: "#ea580c" }}>
                <FaClipboardCheck />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Notices */}
        <div className="col-lg-7">
          <div className="card card-custom h-100 p-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: "#1a237e" }}>
              <FaInfoCircle /> Recent Notices
            </h5>

            {[
              { t: "Holiday Announcement", d: "17 Oct 2025", b: "The college will observe a holiday on October 18st for Diwali celebrations." },
              { t: "Exam Schedule Update", d: "23 Oct 2025", b: "Exam will be conducted on 24 Oct." },
              { t: "Faculty meeting", d: "23 Oct 2025", b: "Faculty meeting on 25th October 2025 at Conference Hall." },
              { t: "Sports Fest", d: "25 Oct 2025", b: "Inter-college Sports Fest starts on 25th October 2025." }
            ].map((n, i) => (
              <div key={i} className="notice-card">
                <div className="notice-header-line mb-2">
                  <div className="fw-bold text-dark"> {n.t}</div>
                  <div className="small text-muted">{n.d}</div>
                </div>
                <div className="notice-body small">{n.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
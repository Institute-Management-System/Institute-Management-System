// ===================== Teacher Dashboard Page =====================

// React hooks for state management and lifecycle handling
import React, { useState, useEffect } from "react";

// Application logo
import Logo from "../../assets/Logo.png";

// Icons used for dashboard statistics and notices
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaInfoCircle,
} from "react-icons/fa";

// Backend services to fetch dashboard-related data
import {
  getStudentCount,
  getStudentCountForTeacher,
  getAverageAttendance,
  getTopTeacherNotices,
  getAssignedSubjectCount
} from "../../services/teacherService";

// Icon for subjects
import { FaBook } from "react-icons/fa";

// Internationalization (i18n) support
import { useTranslation } from "react-i18next";

// ===================== COMPONENT =====================

const TeacherDashboard = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== STATE ===================== */

  // Dashboard stats configuration array
  const [stats, setStats] = useState([]);

  // Latest notices list
  const [notices, setNotices] = useState([]);

  // Individual stat values
  const [studentCount, setStudentCount] = useState(0);
  const [averageAttendance, setAverageAttendance] = useState("0/0");
  const [subjectCount, setSubjectCount] = useState(0);

  /* ================= LOAD DASHBOARD DATA ================= */
  useEffect(() => {
    // Get logged-in teacher from session storage
    const user = JSON.parse(sessionStorage.getItem("user"));
    const teacherId = user?.id;

    // ---------------- STUDENT COUNT (Teacher Specific) ----------------
    if (teacherId) {
      getStudentCountForTeacher(teacherId)
        .then((res) => setStudentCount(res.data))
        .catch(() => console.error("Failed to load student count"));
    }

    // ---------------- AVERAGE ATTENDANCE ----------------
    getAverageAttendance()
      .then((res) => setAverageAttendance(res.data))
      .catch(() => setAverageAttendance("0/0"));

    // ---------------- ASSIGNED SUBJECT COUNT ----------------
    if (teacherId) {
      getAssignedSubjectCount(teacherId)
        .then((res) => setSubjectCount(res.data))
        .catch(() => console.error("Failed to load subject count"));
    }

    // ---------------- TOP 5 TEACHER NOTICES ----------------
    getTopTeacherNotices()
      .then((res) => setNotices(res.data.data))
      .catch(() => console.error("Failed to load notices"));
  }, []);

  /* ================= UPDATE STATS ================= */
  useEffect(() => {
    // Prepare stats data for rendering
    setStats([
      {
        title: "total_students",
        value: studentCount,
        subtext: "",
      },
      {
        title: "subjects_assigned",
        value: subjectCount,
        subtext: "Total Subjects Assigned",
      },
      {
        title: "average_attendance",
        value: averageAttendance,
        subtext: "Average Monthly Class Attendance",
      },
    ]);
  }, [studentCount, averageAttendance, subjectCount]);

  /* ================= STAT STYLE HANDLER ================= */
  // Returns icon and styling based on stat type
  const getStatStyle = (title) => {
    switch (title) {
      case "total_students":
        return { icon: <FaUserGraduate />, bg: "#e0f2fe", color: "#0284c7" };
      case "subjects_assigned":
        return { icon: <FaBook />, bg: "#e0e7ff", color: "#4338ca" };
      case "average_attendance":
        return { icon: <FaClipboardCheck />, bg: "#ffedd5", color: "#ea580c" };
      default:
        return { icon: <FaInfoCircle />, bg: "#f3f4f6", color: "#4b5563" };
    }
  };

  /* ===================== UI ===================== */
  return (
    <>
      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} className="me-3" />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          {t('institute_management_system')}
        </h4>
      </div>

      <div className="row g-4">
        {/* LEFT SECTION: STAT CARDS */}
        <div className="col-12 col-md-12 col-lg-5 d-flex flex-column gap-3">
          {stats.map((stat, index) => {
            const style = getStatStyle(stat.title);
            return (
              <div key={index} className="card card-custom p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted fw-bold small text-uppercase">
                      {t(stat.title)}
                    </h6>
                    <h2 className="fw-bold mb-0 text-dark">
                      {stat.value}
                    </h2>
                    <small className="text-muted">{stat.subtext}</small>
                  </div>

                  {/* Stat Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: style.bg,
                      color: style.color,
                      fontSize: "1.5rem",
                    }}
                  >
                    {style.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SECTION: LATEST NOTICES */}
        <div className="col-12 col-md-12 col-lg-7">
          <div className="card card-custom h-100 p-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <FaInfoCircle /> {t('latest_notices')}
            </h5>

            {/* Notices List */}
            {notices.length > 0 ? (
              notices.map((n) => (
                <div key={n.id} className="mb-3">
                  <div className="fw-bold">{n.title}</div>
                  <small className="text-muted">
                    {new Date(n.publishDate).toLocaleDateString()}
                  </small>
                  <div className="bg-light p-3 rounded mt-1">
                    {n.description}
                  </div>
                </div>
              ))
            ) : (
              // Empty state when no notices are available
              <p className="text-muted">{t('no_notices')}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherDashboard;

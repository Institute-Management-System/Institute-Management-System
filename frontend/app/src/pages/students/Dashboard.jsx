// React hooks for state management and lifecycle handling
import React, { useState, useEffect } from "react";

// Icons used for dashboard statistics and notices
import {
  FaUserFriends,
  FaBookOpen,
  FaClock,
  FaInfoCircle,
  FaBell,
} from "react-icons/fa";

// Student-related API service calls
import {
  fetchTotalCourses,        // Fetches total enrolled courses count
  fetchTotalSubjects,       // Fetches total subjects count
  fetchOverallAttendance,   // Fetches overall attendance percentage
  fetchTopNotices,          // Fetches latest/top notices
  fetchStudentCourses,      // Fetches student enrolled courses
} from "../../services/student.service";

// i18n translation hook
import { useTranslation } from "react-i18next";

const StudentDashboard = () => {
  // Translation function
  const { t } = useTranslation();

  // Dashboard statistics (cards)
  const [stats, setStats] = useState([]);

  // Latest notices list
  const [notices, setNotices] = useState([]);

  // Loader flag
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DASHBOARD ON COMPONENT MOUNT ================= */
  useEffect(() => {
    loadDashboard();
  }, []);

  /* ================= DASHBOARD DATA LOADER ================= */
  const loadDashboard = async () => {
    try {
      setLoading(true);

      // Fetch student courses to determine active course
      const myCourses = await fetchStudentCourses();
      const activeCourseId =
        myCourses.length > 0 ? myCourses[0].courseId : null;

      // Fetch course and subject statistics
      const coursesCount = await fetchTotalCourses();
      const subjectsCount = await fetchTotalSubjects();

      // Fetch attendance only if course exists
      let attendance = null;
      if (activeCourseId) {
        attendance = await fetchOverallAttendance({
          courseId: activeCourseId,
        });
      }

      // Fetch top/latest notices
      const topNotices = await fetchTopNotices();

      // Prepare statistics cards data
      setStats([
        {
          title: "courses_enrolled",
          value: coursesCount,
          desc: "Enrolled courses",
        },
        {
          title: "total_subjects",
          value: subjectsCount,
          desc: "Total subjects",
        },
        {
          title: "overall_attendance",
          value: `${attendance?.attendancePercentage?.toFixed(1) ?? 0}%`,
          desc: "Overall attendance",
        },
      ]);

      // Set notices list
      setNotices(topNotices);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STAT CARD STYLING HELPER ================= */
  const getStatStyle = (title) => {
    // Style based on stat type
    if (title === "courses_enrolled")
      return {
        icon: <FaUserFriends />,
        bg: "#e0f2fe",
        color: "#0284c7",
      };

    if (title === "total_subjects")
      return {
        icon: <FaBookOpen />,
        bg: "#dcfce7",
        color: "#16a34a",
      };

    if (title === "overall_attendance")
      return {
        icon: <FaClock />,
        bg: "#ffedd5",
        color: "#ea580c",
      };

    // Default style
    return {
      icon: <FaInfoCircle />,
      bg: "#f3f4f6",
      color: "#4b5563",
    };
  };

  return (
    <div className="container-fluid p-0">
      {/* ================= DASHBOARD HEADER ================= */}
      <div className="mb-4">
        <h4 className="fw-bold text-dark">{t("dashboard")}</h4>
        <p className="text-muted small">
          {t("welcome_back")}
        </p>
      </div>

      <div className="row g-4">
        {/* ================= LEFT SECTION : STATS CARDS ================= */}
        <div className="col-lg-5 d-flex flex-column gap-3">
          {stats.map((stat) => {
            const style = getStatStyle(stat.title);

            return (
              <div
                key={stat.title}
                className="card border-0 shadow-sm p-4"
                style={{ borderRadius: "12px" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  {/* Stat Info */}
                  <div>
                    <h6 className="text-muted fw-bold text-uppercase small mb-2">
                      {t(stat.title)}
                    </h6>

                    {/* Show loader while fetching */}
                    <h2 className="fw-bold mb-1 text-dark">
                      {loading ? "..." : stat.value}
                    </h2>

                    <small className="text-secondary">
                      {stat.desc}
                    </small>
                  </div>

                  {/* Stat Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
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

        {/* ================= RIGHT SECTION : TOP 5 NOTICES ================= */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100 p-4">
            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <FaBell className="text-warning" />
              {t("latest_notices")}
            </h6>

            {/* No Notices State */}
            {notices.length === 0 ? (
              <p className="text-muted text-center mb-0">
                {t("no_notices")}
              </p>
            ) : (
              /* Notices List */
              <div className="d-flex flex-column gap-3">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3 rounded bg-light"
                    style={{ borderLeft: "4px solid #1f2b70" }}
                  >
                    <div className="fw-semibold text-dark">
                      {notice.title}
                    </div>

                    <div className="text-muted small mb-1">
                      {notice.publishDate}
                    </div>

                    <div
                      className="text-secondary"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {notice.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

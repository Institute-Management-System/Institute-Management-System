import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import AdminService from "../../services/admin.service";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaInfoCircle } from "react-icons/fa";
import API from "../../api";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, teachers, courses, noticesResponse] = await Promise.all([
          API.get("/admin/students"),
          API.get("/admin/teachers"),
          API.get("/admin/courses"),
          // Fetch notices from backend (it's already sorted DESC by date in backend)
          AdminService.getAllNotices()
        ]);

        const backendStats = [
          { title: "total_students", value: students.data.length, subtext: t("subtext_students") },
          { title: "total_teachers", value: teachers.data.length, subtext: t("subtext_teachers") },
          { title: "total_courses", value: courses.data.length, subtext: t("subtext_courses") }
        ];
        setStats(backendStats);

        // Take only top 5 notices
        const top5Notices = noticesResponse.data ? noticesResponse.data.slice(0, 5) : [];
        setNotices(top5Notices);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        // Fallback or empty states
        const backendStats = [
          { title: "total_students", value: "0", subtext: t("subtext_students") },
          { title: "total_teachers", value: "0", subtext: t("subtext_teachers") },
          { title: "total_courses", value: "0", subtext: t("subtext_courses") }
        ];
        setStats(backendStats);
        setNotices([]);
      }
    };

    fetchStats();
  }, []);

  const getStatStyle = (title) => {
    switch (title) {
      case "total_students":
        return { icon: <FaUserGraduate />, bg: "bg-primary bg-opacity-10", color: "text-primary" };
      case "total_teachers":
        return { icon: <FaChalkboardTeacher />, bg: "bg-success bg-opacity-10", color: "text-success" };
      case "total_courses":
        return { icon: <FaBook />, bg: "bg-warning bg-opacity-10", color: "text-warning" };
      default:
        return { icon: <FaInfoCircle />, bg: "bg-secondary bg-opacity-10", color: "text-secondary" };
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* HEADER */}
      <header className="d-flex align-items-center p-3 bg-white border-bottom shadow-sm">
        <img src={Logo} alt="Logo" width={45} className="me-3" />
        <h3 className="mb-0 fw-bold" style={{ color: "#2e335b" }}>{t('institute_management_system')}</h3>
      </header>

      <div className="container mt-4">
        <div className="row g-4">

          {/* LEFT COLUMN - STATS */}
          <div className="col-12 col-md-12 col-lg-5">
            <div className="d-flex flex-column gap-3">
              {stats.map((stat, index) => {
                const style = getStatStyle(stat.title);
                return (
                  <div key={index} className="card shadow-sm border-0 p-4 hover-shadow transition-all">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-secondary fw-bold small text-uppercase mb-2">{t(stat.title)}</h6>
                        <h2 className="fw-bold mb-1 text-dark">{stat.value}</h2>
                        <small className="text-muted">{stat.subtext}</small>
                      </div>
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

          {/* RIGHT COLUMN - NOTICES */}
          <div className="col-12 col-md-12 col-lg-7">
            <div className="card shadow-sm border-0 h-100 p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark border-bottom pb-3">
                <FaInfoCircle className="text-primary" /> {t('recent_notices')}
              </h5>

              <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: "600px" }}>
                {notices.map((n) => (
                  <div key={n.id} className="p-3 rounded bg-light border-start border-4 border-primary shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold text-dark mb-0">{n.title}</h6>
                      <span className="badge bg-white text-primary border">{n.publishDate}</span>
                    </div>
                    <p className="text-muted small mb-0">
                      {n.description}
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
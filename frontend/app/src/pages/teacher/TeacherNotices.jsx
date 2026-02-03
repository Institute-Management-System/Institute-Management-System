// ===================== Teacher Notices Page=====================

// React hooks for state management and lifecycle handling
import React, { useEffect, useState } from "react";

// Internationalization (i18n) hook for translations
import { useTranslation } from "react-i18next";

// Application logo
import Logo from "../../assets/Logo.png";

// Bell icon for notice board header
import { FaBell } from "react-icons/fa";

// Toast notifications for feedback and errors
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Backend service to fetch teacher notices
import { getTeacherNotices } from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherNotices = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== STATE ===================== */

  // State to store list of notices
  const [notices, setNotices] = useState([]);

  /* ===================== LOAD NOTICES ===================== */
  useEffect(() => {
    // Fetch notices related to the teacher
    getTeacherNotices()
      .then((res) => {
        // Backend response structure contains data inside res.data.data
        setNotices(res.data.data);
      })
      .catch(() => toast.error(t('failed_load_notices')));
  }, []);

  /* ===================== UI ===================== */
  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          {t('notices')}
        </h4>
      </div>

      {/* Notices Card */}
      <div className="card card-custom p-4">
        {/* Notice Board Title */}
        <h5
          className="fw-bold mb-4 d-flex align-items-center gap-2"
          style={{ color: "#1a237e" }}
        >
          <FaBell /> {t('notice_board')}
        </h5>

        {/* Notices List */}
        <div className="d-flex flex-column gap-3">
          {notices.length > 0 ? (
            notices.map((n) => (
              <div key={n.id} className="notice-card">
                {/* Notice Title and Date */}
                <div
                  className="mb-2 ps-3"
                  style={{ borderLeft: "4px solid #1a237e" }}
                >
                  <div className="fw-bold text-dark">{n.title}</div>
                  <div className="small text-muted">
                    {new Date(n.publishDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Notice Description */}
                <div className="bg-light p-3 rounded border text-secondary small shadow-sm">
                  {n.description}
                </div>
              </div>
            ))
          ) : (
            // Empty state when no notices are available
            <p className="text-muted text-center py-4">
              {t('no_new_notices')}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherNotices;

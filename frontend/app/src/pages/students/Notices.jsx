// React hooks for lifecycle and state management
import React, { useEffect, useState } from "react";

// i18n hook for multilingual text support
import { useTranslation } from "react-i18next";

// Toast container for notifications (future extensibility)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API service to fetch student notices
import { fetchStudentNotices } from "../../services/student.service";

const Notices = () => {
  // Translation function
  const { t } = useTranslation();

  // Notices list
  const [notices, setNotices] = useState([]);

  // Loader flag
  const [loading, setLoading] = useState(true);

  /* ================= LOAD NOTICES ON COMPONENT MOUNT ================= */
  useEffect(() => {
    loadNotices();
  }, []);

  /* ================= FETCH NOTICES FROM BACKEND ================= */
  const loadNotices = async () => {
    try {
      const data = await fetchStudentNotices();

      // Defensive check to ensure array response
      setNotices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load notices", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= NOTICE BOARD CARD ================= */}
      <div className="card card-custom p-4">
        {/* Header */}
        <h5
          className="fw-bold mb-4 d-flex align-items-center gap-2"
          style={{ color: "#1f2b70" }}
        >
          🔔 {t("notice_board")}
        </h5>

        {/* ================= UI STATES ================= */}
        {loading ? (
          /* Loading State */
          <p className="text-center text-muted">
            {t("loading_notices")}
          </p>
        ) : notices.length === 0 ? (
          /* Empty State */
          <p className="text-center text-muted">
            {t("no_new_notices")}
          </p>
        ) : (
          /* Notices List */
          <div className="d-flex flex-column gap-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="pb-3"
                style={{ borderBottom: "1px solid #f1f5f9" }}
              >
                {/* Notice Header */}
                <div
                  className="ps-3 mb-2"
                  style={{ borderLeft: "5px solid #1f2b70" }}
                >
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "1rem" }}
                  >
                    {notice.title}
                  </div>

                  <div className="text-muted small">
                    {notice.publishDate}
                  </div>
                </div>

                {/* Notice Description */}
                <div
                  className="bg-light p-3 rounded text-secondary shadow-sm"
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                  }}
                >
                  {notice.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notices;

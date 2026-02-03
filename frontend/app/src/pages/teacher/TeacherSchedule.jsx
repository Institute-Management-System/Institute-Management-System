// ===================== Teacher Schedule Page=====================

// React hooks for state management and lifecycle handling
import React, { useState, useEffect } from "react";

// Internationalization (i18n) hook for translations
import { useTranslation } from "react-i18next";
// useState  -> to store schedule data in component state
// useEffect -> to fetch/load schedule data when component loads

// Application logo
import Logo from "../../assets/Logo.png";
// Institute logo for header section

// File icon used for timetable download/view action
import { FaFileAlt } from "react-icons/fa";
// File icon for timetable/view schedule button

// Toast notifications for user feedback
import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> required to display toast messages
// toast -> used to show popup notifications (info/success/error)

// Toastify default CSS
import "react-toastify/dist/ReactToastify.css";

// Backend service to fetch teacher subjects and schedules
import { getTeacherSubjects } from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherSchedule = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== USER CONTEXT ===================== */

  // Get logged-in teacher details from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const teacherId = user?.id;

  /* ===================== STATE ===================== */

  // State to hold schedule data fetched from backend
  const [scheduleData, setScheduleData] = useState([]);

  /* ===================== LOAD SCHEDULE ===================== */

  // Fetch schedule data when component loads or teacherId changes
  useEffect(() => {
    if (teacherId) {
      getTeacherSubjects(teacherId)
        .then((res) => {
          // Store API response in state
          setScheduleData(res.data);
        })
        .catch(() => {
          toast.error(t('failed_fetch_schedule'));
        });
    }
  }, [teacherId]);

  /* ===================== VIEW TIMETABLE ===================== */

  // Handle timetable view action (currently informational)
  const handleViewTimetable = (subjectName) => {
    toast.info(`Opening timetable for ${subjectName}`);
  };

  /* ===================== UI ===================== */
  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          {t('class_schedule')}
        </h4>
      </div>

      {/* Schedule Card */}
      <div className="card card-custom p-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            {/* Table Header */}
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>{t('id')}</th>
                <th>{t('course_name')}</th>
                <th>{t('subject_name')}</th>
                <th>{t('start_date')}</th>
                <th className="text-center">{t('action')}</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {scheduleData.length > 0 ? (
                scheduleData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td className="fw-semibold">{row.courseName}</td>
                    <td style={{ color: "#1a237e" }}>{row.subjectName}</td>
                    <td>{row.startDate}</td>
                    <td className="text-center">
                      {/* Show download button if timetable exists */}
                      {row.timetablePath ? (
                        <a
                          href={`http://localhost:8080${row.timetablePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-light border shadow-sm"
                          title={t('download_schedule')}
                        >
                          <FaFileAlt className="text-primary" />
                        </a>
                      ) : (
                        // Disabled button if no timetable is available
                        <button
                          className="btn btn-sm btn-light border shadow-sm"
                          disabled
                          title="No Schedule"
                        >
                          <FaFileAlt className="text-muted" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                // Empty state when no schedule data is available
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    {t('no_schedule_available')}
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherSchedule;

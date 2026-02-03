// ===================== Teacher Student Attendance Page=====================

// React hooks for managing state and side effects
import React, { useState, useEffect } from "react";

// Internationalization (i18n) hook for multi-language support
import { useTranslation } from "react-i18next";
// useState  -> to store attendance data in component state
// useEffect -> to fetch/load data when component loads

// Application logo used in page header
import Logo from "../../assets/Logo.png";
// Institute logo image for header section

// Toast notifications for user feedback
import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> container for toast messages on screen
// toast -> used to show success/error notification messages

// react-toastify default styling
import "react-toastify/dist/ReactToastify.css";

// Backend service to fetch student attendance data
import { getStudentAttendance } from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherStudentAttendance = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== STATE ===================== */

  // State to store student attendance records
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // State to manage loading indicator
  const [loading, setLoading] = useState(false);

  /* ===================== LOAD ATTENDANCE ===================== */

  // Fetch attendance data when component loads
  useEffect(() => {
    setLoading(true);

    getStudentAttendance()
      .then((res) => {
        // Store API response data into state
        setAttendanceRecords(res.data);
      })
      .catch(() => {
        // Show error toast if API call fails
        toast.error(t('failed_fetch_attendance'));
      })
      .finally(() => setLoading(false));
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
          {t('student_attendance_title')}
        </h4>
      </div>

      {/* Attendance Card */}
      <div className="card card-custom p-4">

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-muted py-4">
            {t('loading_attendance')}
          </div>
        ) : (
          // Attendance Table
          <div className="table-responsive">
            <table className="table table-hover align-middle">

              {/* Table Header */}
              <thead className="table-light">
                <tr>
                  <th>{t('roll_no')}</th>
                  <th>{t('header_student_name')}</th>
                  <th>{t('header_course')}</th>
                  <th>{t('overall_percentage')}</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((r, index) => (
                    <tr key={index}>
                      <td>{r.rollNumber}</td>
                      <td className="fw-bold">{r.studentName}</td>
                      <td>{r.courseName}</td>
                      <td className="fw-bold">
                        {r.overallPercent}%
                      </td>
                    </tr>
                  ))
                ) : (
                  // Empty state when no attendance records are found
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">
                      {t('no_attendance_records')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherStudentAttendance;

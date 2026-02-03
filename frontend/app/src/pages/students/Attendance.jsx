// React hooks for lifecycle, state management, and memoized functions
import React, { useEffect, useState, useCallback } from "react";

// i18n hook for multi-language support
import { useTranslation } from "react-i18next";

// Toast notifications (used for alerts / feedback)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API service methods related to student attendance
import {
  fetchAttendanceTable,      // Fetches daily attendance records
  fetchOverallAttendance,    // Fetches overall attendance summary
  fetchMonthlyAttendance,    // Fetches month-wise attendance summary
  fetchStudentCourses,       // Fetches courses enrolled by student
} from "../../services/student.service";

const Attendance = () => {
  // Translation function
  const { t } = useTranslation();

  // Stores attendance table rows
  const [tableData, setTableData] = useState([]);

  // Stores summary statistics (cards)
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    percentage: 0
  });

  // Selected month filter ("All" or month number)
  const [monthFilter, setMonthFilter] = useState("All");

  // Loader flag for UI feedback
  const [loading, setLoading] = useState(false);

  // List of courses for dropdown
  const [courses, setCourses] = useState([]);

  // Selected course ID
  const [selectedCourseId, setSelectedCourseId] = useState("");

  // User ID fetched from session storage (token usually used in backend)
  const userId = Number(sessionStorage.getItem("userId"));

  /* ================= FETCH COURSES ON COMPONENT MOUNT ================= */
  useEffect(() => {
    fetchStudentCourses().then((data) => {
      if (data && data.length > 0) {
        setCourses(data);

        // Automatically select first course
        setSelectedCourseId(data[0].courseId);
      }
    });
  }, []);

  // Attendance year (can be made dynamic later)
  const YEAR = 2026;

  /* ================= MAIN DATA LOADER ================= */
  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      let summaryRes;
      let startDate;
      let endDate;

      // Prevent API call if course is not selected
      if (!selectedCourseId) {
        setLoading(false);
        return;
      }

      /* ---------- SUMMARY DATA ---------- */
      if (monthFilter === "All") {
        // Fetch yearly summary
        summaryRes = await fetchOverallAttendance({
          courseId: selectedCourseId
        });

        startDate = `${YEAR}-01-01`;
        endDate = `${YEAR}-12-31`;
      } else {
        // Fetch month-wise summary
        const month = String(monthFilter).padStart(2, "0");

        summaryRes = await fetchMonthlyAttendance({
          courseId: selectedCourseId,
          month: `${YEAR}-${month}`
        });

        startDate = `${YEAR}-${month}-01`;
        endDate = `${YEAR}-${month}-31`;
      }

      // Update summary cards
      setSummary({
        total: summaryRes?.totalLectures ?? 0,
        present: summaryRes?.presentCount ?? 0,
        absent: summaryRes?.absentCount ?? 0,
        percentage: summaryRes?.attendancePercentage ?? 0
      });

      /* ---------- TABLE DATA ---------- */
      const tableRes = await fetchAttendanceTable({
        courseId: selectedCourseId,
        startDate,
        endDate
      });

      // Ensure table data is always an array
      setTableData(Array.isArray(tableRes) ? tableRes : []);
    } catch (error) {
      console.error("Attendance Fetch Error:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCourseId, monthFilter]);

  /* ================= RELOAD DATA WHEN FILTER CHANGES ================= */
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mt-4">
      {/* Toast messages */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card p-4 shadow-sm border-0">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-primary">
            {t('attendance_tracker')}
          </h4>

          <div className="d-flex gap-2">
            {/* Course Dropdown */}
            <select
              className="form-select w-auto"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseName}
                </option>
              ))}
            </select>

            {/* Month Dropdown */}
            <select
              className="form-select w-auto"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="All">
                {t('all_months_option')}
              </option>

              {/* Dynamically generate 12 months */}
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long"
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="row g-3 mb-4">
          <SummaryBox title={t('summary_total')} value={summary.total} />
          <SummaryBox title={t('summary_present')} value={summary.present} type="success" />
          <SummaryBox title={t('summary_absent')} value={summary.absent} type="danger" />
          <SummaryBox
            title={t('summary_attendance_percentage')}
            value={`${summary.percentage?.toFixed(1)}%`}
            type="primary"
          />
        </div>

        {/* ================= ATTENDANCE TABLE ================= */}
        <div className="table-responsive">
          <table className="table table-hover align-middle border">
            <thead className="table-light">
              <tr>
                <th>{t('date')}</th>
                <th>{t('subject')}</th>
                <th className="text-center">{t('status')}</th>
              </tr>
            </thead>

            <tbody>
              {/* Loader State */}
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    {t('loading_attendance')}
                  </td>
                </tr>

              /* Empty State */
              ) : tableData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted">
                    {t('no_records_found')}
                  </td>
                </tr>

              /* Data Rows */
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.attendanceDate}</td>
                    <td className="fw-semibold">{row.subjectName}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          row.status === "PRESENT"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ================= SUMMARY CARD COMPONENT ================= */
const SummaryBox = ({ title, value, type }) => {
  // Color mapping based on card type
  const colorMap = {
    success: "bg-success text-success",
    danger: "bg-danger text-danger",
    primary: "bg-primary text-primary"
  };

  return (
    <div className="col-md-3">
      <div
        className={`p-3 rounded-3 border-start border-4 ${
          colorMap[type] || "bg-light text-dark"
        } bg-opacity-10 shadow-sm`}
      >
        <div className="small fw-bold opacity-75 text-uppercase">
          {title}
        </div>
        <h3 className="mb-0 fw-bold">{value}</h3>
      </div>
    </div>
  );
};

export default Attendance;

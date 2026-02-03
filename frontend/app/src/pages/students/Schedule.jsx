// React hooks for component lifecycle and state management
import React, { useState, useEffect } from "react";

// i18n hook for multilingual text support
import { useTranslation } from "react-i18next";

// Toast notifications for error handling and feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API service to fetch student subject timetable
import { fetchStudentSubjectTimetable } from "../../services/student.service";

const Schedule = () => {
  // Translation function
  const { t } = useTranslation();

  // Schedule list
  const [schedules, setSchedules] = useState([]);

  // Loader flag
  const [loading, setLoading] = useState(false);

  /* ================= LOAD SCHEDULE ON COMPONENT MOUNT ================= */
  useEffect(() => {
    loadSchedule();
  }, []);

  /* ================= FETCH SCHEDULE FROM BACKEND ================= */
  const loadSchedule = async () => {
    try {
      setLoading(true);

      // API call to fetch timetable
      const data = await fetchStudentSubjectTimetable();
      setSchedules(data);
    } catch (error) {
      toast.error(t("failed_fetch_schedule"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= CLASS SCHEDULE CARD ================= */}
      <div className="card card-custom p-4">
        {/* Header */}
        <h5 className="fw-bold mb-4">
          {t("class_schedule")}
        </h5>

        {/* ================= SCHEDULE TABLE ================= */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th className="text-center">{t("id")}</th>
                <th className="text-center">{t("course")}</th>
                <th className="text-center">{t("subject")}</th>
                <th className="text-center">{t("duration")}</th>
                <th className="text-center">{t("schedule")}</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    {t("loading_schedule")}
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!loading &&
                schedules.map((row, index) => (
                  <tr key={`${row.subjectId}-${index}`}>
                    <td className="text-center">
                      {index + 1}
                    </td>

                    <td className="text-center">
                      {row.courseName}
                    </td>

                    <td className="text-center fw-semibold">
                      {row.subjectName}
                    </td>

                    <td className="text-center">
                      {row.duration} {t("duration_days")}
                    </td>

                    <td className="text-center">
                      {row.schedulePath ? (
                        /* Download schedule file */
                        <a
                          href={`http://localhost:8080/api${row.schedulePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          {t("download")}
                        </a>
                      ) : (
                        /* No schedule available */
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}

              {/* Empty State */}
              {!loading && schedules.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    {t("no_schedule_available")}
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

export default Schedule;

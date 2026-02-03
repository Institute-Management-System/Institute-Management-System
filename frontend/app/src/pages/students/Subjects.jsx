// React hooks for state management and lifecycle
import React, { useState, useEffect } from "react";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

// Toast notifications for error handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API service to fetch enrolled subjects
import { fetchEnrolledSubjects } from "../../services/student.service";

const Subjects = () => {
  // Translation function
  const { t } = useTranslation();

  // List of enrolled subjects
  const [subjectList, setSubjectList] = useState([]);

  // Loader flag
  const [loading, setLoading] = useState(false);

  /* ================= LOAD SUBJECTS ON COMPONENT MOUNT ================= */
  useEffect(() => {
    loadSubjects();
  }, []);

  /* ================= FETCH ENROLLED SUBJECTS ================= */
  const loadSubjects = async () => {
    try {
      setLoading(true);

      // API call to fetch subjects student is enrolled in
      const data = await fetchEnrolledSubjects();
      setSubjectList(data);
    } catch (error) {
      toast.error(t("failed_load_subjects"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= ENROLLED SUBJECTS CARD ================= */}
      <div className="card card-custom p-4">
        {/* Header */}
        <h5 className="mb-4 fw-bold">
          {t("enrolled_subjects")}
        </h5>

        {/* ================= SUBJECTS TABLE ================= */}
        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th className="text-center">{t("id")}</th>
                <th className="text-center">{t("courses")}</th>
                <th className="text-center">{t("start_date")}</th>
                <th className="text-center">{t("subject_name")}</th>
                <th className="text-center">{t("schedule")}</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    {t("loading_subjects")}
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!loading &&
                subjectList.map((s, index) => (
                  <tr key={`${s.id}-${index}`}>
                    <td className="text-center">
                      {index + 1}
                    </td>

                    {/* Course Name */}
                    <td className="text-center">
                      <span className="badge bg-light text-dark border">
                        {s.courseName}
                      </span>
                    </td>

                    {/* Subject Assigned Date */}
                    <td className="text-center text-muted">
                      {s.assignedDate}
                    </td>

                    {/* Subject Name */}
                    <td className="text-center fw-semibold text-primary">
                      {s.subjectName}
                    </td>

                    {/* Schedule Download */}
                    <td className="text-center">
                      {s.schedulePath ? (
                        <a
                          href={`http://localhost:8080/api${s.schedulePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-download me-1"></i>
                          {t("download")}
                        </a>
                      ) : (
                        <span className="text-muted">
                          N/A
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

              {/* Empty State */}
              {!loading && subjectList.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    {t("no_subjects_enrolled")}
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

export default Subjects;

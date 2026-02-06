// ===================== Teacher Subjects Page =====================

// React hooks for managing component state and lifecycle
import React, { useState, useEffect } from "react";

// Internationalization (i18n) hook for translating UI text
import { useTranslation } from "react-i18next";

// Application logo used in the page header
import Logo from "../../assets/Logo.png";

// Toast notifications for user feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Backend service to fetch subjects assigned to the teacher
// Updated to use real service
import { getTeacherSubjects } from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherSubjects = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== STATE ===================== */

  // State to store assigned subjects
  const [subjects, setSubjects] = useState([]);

  // Get logged-in user details from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const teacherId = user?.id;

  /* ===================== LOAD SUBJECTS ===================== */

  // Fetch assigned subjects when component mounts or teacherId changes
  useEffect(() => {
    if (!teacherId) return;

    getTeacherSubjects(teacherId)
      .then(res => {
        // Map backend DTO (MySubjectDTO) to UI-friendly format
        // Backend DTO: { id, courseName, startDate, subjectName, schedulePath }
        // UI expects:  { id, course, date, subject, schedulePath }
        const mapped = res.data.map(item => ({
          id: item.id,
          course: item.courseName,
          date: item.startDate,
          subject: item.subjectName,
          schedulePath: item.schedulePath
        }));

        // Store mapped subjects in state
        setSubjects(mapped);
      })
      .catch(err => {
        console.error(err);
        // Show error message if subjects fail to load
        toast.error(t('failed_load_subjects'));
      });
  }, [teacherId]);

  /* ===================== UI ===================== */
  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          {t('assigned_subjects')}
        </h4>
      </div>

      {/* Subjects Card */}
      <div className="card card-custom p-4">

        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle mb-0">

            {/* Table Header */}
            <thead className="table-light">
              <tr>
                <th style={{ width: "100px" }}>{t('id')}</th>
                <th>{t('header_course_name')}</th>
                <th>{t('start_date')}</th>
                <th>{t('header_subject_name')}</th>
                <th>{t('schedule')}</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>

                    {/* Course name */}
                    <td>
                      <span className="badge bg-light text-dark border">
                        {s.course}
                      </span>
                    </td>

                    {/* Subject start date */}
                    <td>{s.date}</td>

                    {/* Subject name */}
                    <td className="fw-bold" style={{ color: "#1a237e" }}>
                      {s.subject}
                    </td>

                    {/* Schedule download */}
                    <td>
                      {s.schedulePath ? (
                        <a
                          href={`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}${s.schedulePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-download me-1"></i> {t('download')}
                        </a>
                      ) : (
                        // Show N/A if no schedule is uploaded
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                // Empty state when no subjects are assigned
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    {t('no_subjects_assigned')}
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
export default TeacherSubjects;

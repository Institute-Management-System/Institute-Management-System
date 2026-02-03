// ===================== Teacher Evaluate Student Page=====================

// React hooks for state management, lifecycle handling, and memoization
import React, { useEffect, useMemo, useState } from "react";

// Internationalization (i18n) support
import { useTranslation } from "react-i18next";

// Application logo
import Logo from "../../assets/Logo.png";

// Toast notifications for user feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Backend services related to subjects, students, and marks
import {
  getTeacherSubjects,
  getStudentsForMarksByName,
  submitMarks,
} from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherEvaluateStudent = () => {
  // Translation function
  const { t } = useTranslation();

  // Retrieve logged-in teacher details from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const teacherId = user?.id;

  /* ===================== STATE ===================== */

  // Subjects assigned to the teacher
  const [subjects, setSubjects] = useState([]);

  // Selected course and subject
  const [courseName, setCourseName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  // Students loaded for evaluation
  const [students, setStudents] = useState([]);

  // Marks mapped by studentId
  const [marks, setMarks] = useState({});

  /* ===================== LOAD SUBJECTS ===================== */
  useEffect(() => {
    // Fetch subjects assigned to the teacher
    if (teacherId) {
      getTeacherSubjects(teacherId)
        .then((res) => setSubjects(res.data))
        .catch(() => toast.error(t('failed_load_subjects')));
    }
  }, [teacherId]);

  /* ===================== UNIQUE COURSES ===================== */

  // Extract unique course names from subjects list
  const courses = useMemo(() => {
    return [...new Set(subjects.map((s) => s.courseName))];
  }, [subjects]);

  /* ===================== FILTER SUBJECTS ===================== */

  // Filter subjects based on selected course
  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => s.courseName === courseName);
  }, [courseName, subjects]);

  /* ===================== LOAD STUDENTS ===================== */

  // Load students for the selected course and subject
  const loadStudents = () => {
    if (!courseName || !subjectName) {
      toast.error(t('please_select_course_subject'));
      return;
    }

    getStudentsForMarksByName(courseName, subjectName)
      .then((res) => {
        // Set students list
        setStudents(res.data);

        // Initialize marks state with existing marks if available
        const init = {};
        res.data.forEach((s) => {
          init[s.studentId] = s.obtainedMarks ?? "";
        });
        setMarks(init);
      })
      .catch(() => toast.error(t('failed_load_students')));
  };

  /* ===================== MARK CHANGE HANDLER ===================== */

  // Update marks for a student with validation (0 to 100)
  const handleMarkChange = (studentId, value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks((prev) => ({
        ...prev,
        [studentId]: value,
      }));
    }
  };

  /* ===================== STATUS CALCULATION ===================== */

  // Determine pass/fail status based on obtained marks
  const getStatus = (mark) => {
    if (mark === "" || mark === undefined) return "-";
    return Number(mark) >= 40 ? "PASS" : "FAIL";
  };

  /* ===================== SAVE MARKS ===================== */

  // Submit evaluated marks to backend
  const handleSave = () => {
    if (students.length === 0) {
      toast.error(t('no_students_to_save'));
      return;
    }

    // Prepare payload for marks submission
    const payload = {
      courseName,
      subjectName,
      marksList: students.map((s) => ({
        studentId: s.studentId,
        obtainedMarks: Number(marks[s.studentId] || 0),
      })),
    };

    submitMarks(payload)
      .then(() => toast.success(t('marks_saved_success')))
      .catch(() => toast.error(t('failed_save_marks')));
  };

  /* ===================== UI ===================== */
  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center gap-3">
        <img src={Logo} alt="Logo" style={{ width: 40 }} />
        <h4 className="fw-bold mb-0">{t('evaluate_students')}</h4>
      </div>

      <div className="card p-4">
        {/* ===================== FILTER SECTION ===================== */}
        <div className="row g-3 mb-4">
          {/* Course Selection */}
          <div className="col-md-4">
            <label className="fw-bold small">{t('header_course')}</label>
            <select
              className="form-select"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                setSubjectName("");
                setStudents([]);
              }}
            >
              <option value="">{t('select_course')}</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selection */}
          <div className="col-md-4">
            <label className="fw-bold small">{t('header_subject')}</label>
            <select
              className="form-select"
              value={subjectName}
              disabled={!courseName}
              onChange={(e) => setSubjectName(e.target.value)}
            >
              <option value="">{t('select_subject')}</option>
              {filteredSubjects.map((s) => (
                <option
                  key={`${s.courseName}-${s.subjectName}`}
                  value={s.subjectName}
                >
                  {s.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Load Students Button */}
          <div className="col-md-4 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={loadStudents}
            >
              {t('load_students')}
            </button>
          </div>
        </div>

        {/* ===================== MARKS TABLE ===================== */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th className="text-center">{t('roll_no')}</th>
                <th>{t('header_student_name')}</th>
                <th className="text-center">{t('marks')}</th>
                <th className="text-center">{t('status')}</th>
              </tr>
            </thead>

            <tbody>
              {/* Empty state */}
              {students.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    {t('no_students_loaded')}
                  </td>
                </tr>
              )}

              {/* Student rows */}
              {students.map((s) => {
                const mark = marks[s.studentId];
                const status = getStatus(mark);

                return (
                  <tr key={s.studentId}>
                    <td className="text-center">{s.rollNumber}</td>
                    <td className="fw-bold">{s.studentName}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="form-control text-center"
                        value={mark}
                        onChange={(e) =>
                          handleMarkChange(s.studentId, e.target.value)
                        }
                      />
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          status === "PASS"
                            ? "bg-success"
                            : status === "FAIL"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Save Marks Button */}
        {students.length > 0 && (
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-success px-5 fw-bold"
              onClick={handleSave}
            >
              {t('save_marks')}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherEvaluateStudent;

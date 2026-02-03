// React hooks for component lifecycle and state management
import React, { useEffect, useState } from "react";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

// Star icon for rating UI
import { FaStar } from "react-icons/fa";

// Toast notifications for success/error feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Student-related API service methods
import {
  fetchStudentCourses,       // Fetches courses enrolled by the student
  fetchSubjectsByCourse,     // Fetches subjects based on selected course
  submitFeedback,            // Submits student feedback
  fetchStudentFeedbacks,     // Fetches student's previous feedbacks
} from "../../services/student.service";

const Feedback = () => {
  // Translation function
  const { t } = useTranslation();

  // Dropdown and data lists
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Form states
  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadCourses();        // Load available courses
    loadMyFeedbacks();    // Load student's submitted feedbacks
  }, []);

  /* ================= LOAD STUDENT COURSES ================= */
  const loadCourses = async () => {
    try {
      const data = await fetchStudentCourses();

      // Remove duplicate courses using Map (safe-guard)
      const unique = Array.from(
        new Map(data.map((c) => [c.courseId, c])).values()
      );

      setCourses(unique);
    } catch {
      toast.error(t("failed_load_courses"));
    }
  };

  /* ================= LOAD STUDENT FEEDBACKS ================= */
  const loadMyFeedbacks = async () => {
    try {
      const data = await fetchStudentFeedbacks();
      setFeedbacks(data);
    } catch {
      toast.error(t("failed_load_feedbacks"));
    }
  };

  /* ================= COURSE CHANGE HANDLER ================= */
  const handleCourseChange = async (e) => {
    const value = e.target.value;

    // Reset dependent fields
    setCourseId(value);
    setSubjectId("");
    setSubjects([]);

    if (!value) return;

    try {
      // Load subjects based on selected course
      const data = await fetchSubjectsByCourse(value);
      setSubjects(data);
    } catch {
      toast.error(t("failed_load_subjects"));
    }
  };

  /* ================= SUBMIT FEEDBACK ================= */
  const handleSubmit = async () => {
    // Basic validation
    if (!courseId || !subjectId || !feedbackText.trim() || rating === 0) {
      toast.error(t("please_fill_all_fields"));
      return;
    }

    // Prepare payload for API
    const payload = {
      feedbackText,
      rating,
      courseId: Number(courseId),
      subjectId: Number(subjectId),
    };

    try {
      // Submit feedback
      await submitFeedback(payload);

      toast.success(t("feedback_submitted_success"));

      // Reset form after successful submission
      setCourseId("");
      setSubjectId("");
      setFeedbackText("");
      setRating(0);
      setSubjects([]);

      // Reload feedback list
      loadMyFeedbacks();
    } catch {
      toast.error(t("failed_submit_feedback"));
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================= FEEDBACK FORM ================= */}
      <div className="card p-4 mb-4">
        <h5 className="fw-bold mb-4">
          {t("submit_feedback")}
        </h5>

        {/* Course Dropdown */}
        <label className="fw-bold small">
          {t("course")}
        </label>
        <select
          className="form-select mb-3"
          value={courseId}
          onChange={handleCourseChange}
        >
          <option value="">
            {t("select_course")}
          </option>
          {courses.map((c) => (
            <option key={c.courseId} value={c.courseId}>
              {c.courseName}
            </option>
          ))}
        </select>

        {/* Subject Dropdown (disabled until course selected) */}
        <label className="fw-bold small">
          {t("subject")}
        </label>
        <select
          className="form-select mb-3"
          value={subjectId}
          disabled={!courseId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">
            {t("select_subject")}
          </option>
          {subjects.map((s) => (
            <option key={s.subjectId} value={s.subjectId}>
              {s.subjectName}
            </option>
          ))}
        </select>

        {/* Feedback Text */}
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder={t("write_feedback_placeholder")}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        {/* Star Rating UI */}
        <div className="d-flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={26}
              className={
                star <= rating
                  ? "text-warning"
                  : "text-secondary opacity-25"
              }
              style={{ cursor: "pointer" }}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          {t("submit_feedback")}
        </button>
      </div>

      {/* ================= ADMIN RESPONSE VIEW ================= */}
      <div className="card p-4">
        <h5 className="fw-bold mb-3">
          {t("my_feedback_and_responses")}
        </h5>

        {/* Empty State */}
        {feedbacks.length === 0 && (
          <p className="text-muted">
            {t("no_feedback_submitted")}
          </p>
        )}

        {/* Feedback List */}
        {feedbacks.map((f) => (
          <div key={f.feedbackId} className="border rounded p-3 mb-3">
            <p className="fw-bold mb-1">
              {t("your_feedback")}
            </p>
            <p className="mb-2">{f.feedbackText}</p>

            <p className="fw-bold mb-1">
              {t("rating")}
            </p>
            <p>{f.rating} / 5</p>

            <p className="fw-bold mb-1">
              {t("admin_response")}
            </p>
            <p className={f.responseText ? "" : "text-muted"}>
              {f.responseText || t("no_response_yet")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feedback;

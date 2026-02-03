// React hooks for lifecycle, state, and memoized calculations
import React, { useEffect, useState, useMemo } from "react";

// i18n hook for translations
import { useTranslation } from "react-i18next";

// API service to fetch student marks
import { fetchStudentMarks } from "../../services/student.service";

// Passing criteria (can be reused / configured)
const PASS_PERCENTAGE = 40;

const Marks = () => {
  // Translation function
  const { t } = useTranslation();

  // Marks list
  const [marks, setMarks] = useState([]);

  // Loader flag
  const [loading, setLoading] = useState(true);

  /* ================= LOAD MARKS ON COMPONENT MOUNT ================= */
  useEffect(() => {
    loadMarks();
  }, []);

  /* ================= FETCH MARKS FROM BACKEND ================= */
  const loadMarks = async () => {
    try {
      const data = await fetchStudentMarks();

      // Defensive check to ensure array data
      setMarks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load marks", err);
      setMarks([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= OVERALL RESULT CALCULATION ================= */
  const overall = useMemo(() => {
    // Skip calculation if no data
    if (marks.length === 0) return null;

    // Sum of obtained marks
    const totalObtained = marks.reduce(
      (sum, m) => sum + m.obtainedMarks,
      0
    );

    // Sum of total marks
    const totalMarks = marks.reduce(
      (sum, m) => sum + m.totalMarks,
      0
    );

    // Calculate percentage
    const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);

    // Determine pass/fail based on configured threshold
    return {
      percentage,
      result: percentage >= PASS_PERCENTAGE ? "PASS" : "FAIL",
    };
  }, [marks]);

  return (
    <div className="card p-4 shadow-sm">
      {/* Header */}
      <h5 className="mb-4 fw-bold text-primary">
        {t("student_marks")}
      </h5>

      {/* ================= MARKS TABLE ================= */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>{t("id")}</th>
              <th>{t("course")}</th>
              <th>{t("subject")}</th>
              <th>{t("obtained")}</th>
              <th>{t("total")}</th>
              <th>{t("result")}</th>
            </tr>
          </thead>

          <tbody>
            {/* Loading State */}
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  Loading...
                </td>
              </tr>

            /* Empty State */
            ) : marks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  {t("no_marks_available")}
                </td>
              </tr>

            /* Data Rows */
            ) : (
              marks.map((m) => (
                <tr key={m.markId}>
                  <td>{m.markId}</td>
                  <td>{m.courseName}</td>
                  <td className="fw-semibold">{m.subjectName}</td>

                  {/* Highlight obtained marks */}
                  <td className="fw-bold text-primary">
                    {m.obtainedMarks}
                  </td>

                  <td>{m.totalMarks}</td>

                  {/* Subject-wise pass/fail */}
                  <td>
                    <span
                      className={`badge ${
                        m.obtainedMarks >= 40
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {m.obtainedMarks >= 40 ? "PASS" : "FAIL"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= OVERALL RESULT ================= */}
      {overall && (
        <div className="mt-4 p-3 border rounded d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            {t("overall_percentage")}:{" "}
            <strong>{overall.percentage}%</strong>
          </h6>

          {/* Overall pass/fail badge */}
          <span
            className={`badge fs-6 ${
              overall.result === "PASS"
                ? "bg-success"
                : "bg-danger"
            }`}
          >
            {overall.result}
          </span>
        </div>
      )}
    </div>
  );
};

export default Marks;

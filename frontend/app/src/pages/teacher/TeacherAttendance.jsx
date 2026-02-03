// ===================== Teacher Attendance Page =====================

// React hooks for state management and lifecycle handling
import React, { useEffect, useState } from "react";

// Toast notifications for user feedback
import { toast } from "react-toastify";

// Application logo
import Logo from "../../assets/Logo.png";

// Backend service to fetch teacher attendance records
import { getTeacherMyAttendance } from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherMyAttendance = () => {
  /* ===================== USER CONTEXT ===================== */

  // Get logged-in user from session storage
  const storedUser = JSON.parse(sessionStorage.getItem("user"));

  // Safely extract teacher ID from different possible response formats
  const teacherId =
    storedUser?.id ||
    storedUser?.user?.id ||
    storedUser?.data?.id;

  /* ===================== STATE ===================== */

  // State to store attendance records
  const [records, setRecords] = useState([]);

  // State to manage loading indicator
  const [loading, setLoading] = useState(true);

  /* ===================== EFFECTS ===================== */

  // Load attendance when component mounts or teacherId changes
  useEffect(() => {
    if (!teacherId) {
      toast.error("Session expired. Please login again.");
      return;
    }
    fetchAttendance();
  }, [teacherId]);

  /* ===================== DATA FETCH ===================== */

  // Fetch teacher attendance records from backend
  const fetchAttendance = async () => {
    try {
      const res = await getTeacherMyAttendance(teacherId);

      // Set attendance records or fallback to empty array
      setRecords(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load attendance records");
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  /* ===================== UI ===================== */
  return (
    <>
      {/* Page header */}
      <div className="page-header mb-4 d-flex align-items-center gap-2 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" width={40} />
        <h4 className="mb-0 fw-bold text-primary">
          My Attendance Record
        </h4>
      </div>

      {/* Attendance table card */}
      <div className="card p-4 shadow-sm">
        {loading ? (
          // Loading state
          <p className="text-center">Loading attendance...</p>
        ) : records.length === 0 ? (
          // Empty state
          <p className="text-center text-muted">
            No attendance records found
          </p>
        ) : (
          // Attendance table
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {records.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.attendanceDate}</td>
                    <td>
                      {/* Status badge */}
                      <span
                        className={`badge rounded-pill px-3 ${
                          row.status === "PRESENT"
                            ? "bg-success"
                            : row.status === "ABSENT"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherMyAttendance;

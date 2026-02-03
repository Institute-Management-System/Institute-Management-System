// React hooks for lifecycle and state management
import React, { useEffect, useState } from "react";

// Icons for paid / pending status indication
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// API service to fetch student fee details
import { fetchStudentFees } from "../../services/student.service";

const Fees = () => {
  // Stores fee records returned from backend
  const [feesData, setFeesData] = useState([]);

  // Loader flag for UI state
  const [loading, setLoading] = useState(true);

  /* ================= LOAD FEES ON COMPONENT MOUNT ================= */
  useEffect(() => {
    loadFees();
  }, []);

  /* ================= FETCH STUDENT FEES ================= */
  const loadFees = async () => {
    try {
      // API call to fetch fee details
      const data = await fetchStudentFees();
      setFeesData(data);
    } catch (error) {
      console.error("Failed to load fees", error);

      // Fallback to empty list on error
      setFeesData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-custom p-4">
      {/* Header */}
      <h5 className="mb-4 fw-bold">
        Fee Details
      </h5>

      {/* ================= FEES TABLE ================= */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th className="text-center">ID</th>
              <th>Course</th>
              <th className="text-center">Total Fees</th>
              <th className="text-center">Status</th>
              <th className="text-center">Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {/* Loading State */}
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>

            /* Empty State */
            ) : feesData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No fee records found
                </td>
              </tr>

            /* Data Rows */
            ) : (
              feesData.map((fee) => (
                <tr key={fee.feeId}>
                  {/* Actual fee record ID */}
                  <td className="text-center">
                    {fee.feeId}
                  </td>

                  {/* Course Name */}
                  <td className="fw-semibold">
                    {fee.courseName}
                  </td>

                  {/* Fee Amount (formatted) */}
                  <td className="text-center">
                    ₹ {fee.amount.toLocaleString()}
                  </td>

                  {/* Payment Status */}
                  <td className="text-center">
                    {fee.status ? (
                      <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 d-inline-flex align-items-center gap-2">
                        <FaCheckCircle />
                        Paid
                      </span>
                    ) : (
                      <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-3 py-2 d-inline-flex align-items-center gap-2">
                        <FaTimesCircle />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Payment Date */}
                  <td className="text-center text-muted">
                    {fee.paymentDate
                      ? new Date(fee.paymentDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;

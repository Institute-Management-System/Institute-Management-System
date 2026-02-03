import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "../../services/admin.service";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStudentFees = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await AdminService.getAllStudentFees();
      setStudents(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_fees'));
    }
  };

  const togglePaymentStatus = async (id, currentStatus) => {
    if (currentStatus === "PAID") return; // Prevent action on frontend as well

    const newStatus = "PAID"; // Can only move to PAID
    try {
      await AdminService.updateFeeStatus(id, newStatus);
      toast.success(`${t('fee_status_updated')} ${newStatus}`);
      fetchFees();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || t('failed_store_fee_status');
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('student_fees_status')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3">{t('details')}</th>
                  <th className="py-3">{t('courses')}</th>
                  <th className="py-3">{t('total_fee')}</th>
                  <th className="py-3">{t('payment_date')}</th>
                  <th className="py-3">{t('status')}</th>
                  <th className="py-3">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="text-start ps-4">
                      <div className="fw-bold">{student.studentName}</div>
                      <div className="text-muted small">ID: {student.studentId}</div>
                      <div className="text-muted small">{student.email}</div>
                      <div className="text-muted small">{student.phone}</div>
                    </td>
                    <td>{student.courseName}</td>
                    <td>₹{student.amount ? student.amount.toLocaleString() : "0"}</td>
                    <td>{student.paymentDate || "-"}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 ${student.status === 'PAID' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      {student.status === 'PAID' ? (
                        <button
                          disabled
                          className="btn btn-sm btn-secondary rounded-pill px-3 fw-bold"
                          style={{ minWidth: "120px", cursor: "not-allowed" }}
                        >
                          {t('paid')}
                        </button>
                      ) : (
                        <button
                          onClick={() => togglePaymentStatus(student.id, student.status)}
                          className="btn btn-sm btn-outline-success rounded-pill px-3 fw-bold"
                          style={{ minWidth: "120px" }}
                        >
                          {t('mark_as_paid')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">{t('no_fee_records')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminStudentFees;
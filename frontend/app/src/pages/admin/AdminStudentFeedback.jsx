import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AdminService from "../../services/admin.service";
import "react-toastify/dist/ReactToastify.css";
import { FaReply } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AdminStudentFeedback = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await AdminService.getAllFeedbacks();
      setFeedbacks(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_dashboard')); // Using a generic failure message or could specific 'failed_fetch_feedbacks' if added
    }
  };

  const handleRespond = (feedback) => {
    // Navigate to the response page with feedback data in state
    // Path matches App.js: /admin/students/feedback-response
    navigate("/admin/students/feedback-response", { state: { feedback } });
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{t('student_feedbacks')}</h3>
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
                  <th className="py-3">{t('student_details')}</th>
                  <th className="py-3">{t('courses')} / {t('subjects')}</th>
                  <th className="py-3">{t('feedback')}</th>
                  <th className="py-3">{t('response')}</th>
                  <th className="py-3">{t('rating')}</th>
                  <th className="py-3">{t('date')}</th>
                  <th className="py-3">{t('status')}</th>
                  <th className="py-3">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((item) => (
                  <tr key={item.id}>
                    <td className="text-start ps-4">
                      <div className="fw-bold">{item.studentName}</div>
                      <div className="text-muted small">ID: {item.studentId}</div>
                    </td>
                    <td>
                      <div>{item.courseName}</div>
                      {item.subjectName && <div className="text-muted small">({item.subjectName})</div>}
                    </td>
                    <td className="text-start" style={{ maxWidth: "300px" }}>
                      <div className="text-truncate" title={item.feedbackText}>{item.feedbackText}</div>
                    </td>
                    <td className="text-start" style={{ maxWidth: "250px" }}>
                      <div className="text-truncate text-muted" title={item.responseText || t('no_response_yet')}>
                        {item.responseText || "—"}
                      </div>
                    </td>
                    <td className="text-warning fw-bold">
                      {"★".repeat(item.rating)}
                    </td>
                    <td>{item.feedbackDate}</td>
                    <td>
                      {item.responseText ? (
                        <span className="badge bg-success">{t('responded')}</span>
                      ) : (
                        <span className="badge bg-warning text-dark">{t('pending')}</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary rounded-pill px-3"
                        onClick={() => handleRespond(item)}
                      >
                        <FaReply className="me-1" /> {item.responseText ? t('view') : t('respond')}
                      </button>
                    </td>
                  </tr>
                ))}
                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4">{t('no_records_found')}</td>
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
export default AdminStudentFeedback;
import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AdminService from "../../services/admin.service";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const AdminFeedbackResponse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState("");
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.feedback) {
      setFeedbackData(location.state.feedback);
      // Pre-fill response if it exists (optional, depends on requirement, but good UX)
      if (location.state.feedback.responseText) {
        setResponse(location.state.feedback.responseText);
      }
    } else {
      toast.error("No feedback data found.");
      navigate("/admin/students/feedbacks");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response.trim()) {
      toast.error("Please enter a response");
      return;
    }

    try {
      await AdminService.respondToFeedback(feedbackData.id, response);
      toast.success("Response submitted successfully!");

      // Delay navigation slightly to let the toast show
      setTimeout(() => {
        navigate("/admin/students/feedbacks");
      }, 1500);

    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error("Failed to submit response.");
    }
  };

  if (!feedbackData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Manage Feedbacks</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "800px", backgroundColor: "#f8f9fa" }}>
          <h5 className="fw-bold mb-3">{t('respond_to_feedback')} #{feedbackData.id}</h5>
          <p className="text-muted mb-4">
            Enter your response to the feedback from <strong>{feedbackData.studentName}</strong>.
          </p>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body bg-white rounded">
              <label className="fw-bold mb-2 text-primary">{t('student_feedback_label')}:</label>
              <p className="fw-semibold mb-3">
                "{feedbackData.feedbackText}"
              </p>
              <div className="d-inline-flex align-items-center border rounded px-3 py-2 bg-light">
                <span className="small text-muted me-2">{t('rating')}:</span>
                <span className="text-warning fs-5">
                  {"★".repeat(feedbackData.rating)}
                </span>
              </div>
              <div className="mt-2 text-muted small">
                Course: {feedbackData.courseName} {feedbackData.subjectName ? `(${feedbackData.subjectName})` : ""}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="fw-bold mb-2">{t('your_response')}</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 rounded-pill fw-bold"
              >
                {t('send_response')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminFeedbackResponse;
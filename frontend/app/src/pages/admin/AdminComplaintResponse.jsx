import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminComplaintResponse = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");

  const complaint = {
    student: "Aarav Sharma",
    subject: "Issue with grading",
    description: "Student believes there was a mistake in the evaluation of the mid-term exam.",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!response.trim()) {
      toast.error("Please enter a response");
      return;
    }
    console.log("Response:", response);
    toast.success("Response sent successfully!");
    setResponse("");
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Complaint Response</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "800px", backgroundColor: "#f8f9fa" }}>
          
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-header bg-white fw-bold">Complaint Details</div>
            <div className="card-body">
              <p className="mb-2"><strong>Student:</strong> {complaint.student}</p>
              <p className="mb-2"><strong>Subject:</strong> {complaint.subject}</p>
              <p className="mb-0"><strong>Description:</strong> {complaint.description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Your Response</label>
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
              <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold">
                Send Response
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminComplaintResponse;
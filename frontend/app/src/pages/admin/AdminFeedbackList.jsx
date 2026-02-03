// AdminFeedbackList.jsx placeholder
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTools, FaArrowLeft } from 'react-icons/fa'; // Make sure you have react-icons installed

const PageUnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      
      {/* Icon */}
      <div className="mb-4 text-warning">
        <FaTools size={60} />
      </div>

      {/* Main Text */}
      <h2 className="fw-bold text-secondary mb-3">Under Construction</h2>
      
      <p className="text-muted text-center mb-4" style={{ maxWidth: '500px' }}>
        We are currently working on this feature. Please check back later.
      </p>

      {/* Go Back Button */}
      <button 
        className="btn btn-outline-primary d-flex align-items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Go Back
      </button>
    </div>
  );
};

export default PageUnderConstruction;
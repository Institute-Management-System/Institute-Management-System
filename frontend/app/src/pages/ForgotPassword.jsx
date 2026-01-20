// Import React and useState hook for managing state
import React, { useState } from "react";

// useNavigate helps in programmatic navigation (redirects)
import { useNavigate } from "react-router-dom";

// Toast components for showing success/error notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon for back arrow
import { FaArrowLeft } from "react-icons/fa";

// Import institute logo
import Logo from "../assets/Logo.png"; 

// ForgetPassword functional component
const ForgetPassword = () => {

  // navigate is used to move between routes
  const navigate = useNavigate();

  // email state stores the user's entered email
  const [email, setEmail] = useState("");

  // Function executed when form is submitted
  const handleSubmit = (e) => {

    // Prevent page reload on form submit
    e.preventDefault();

    // Validation: email should not be empty
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // BACKEND CONNECTION (future implementation)
    // axios.post("/api/auth/reset-password", { email })

    // Success message shown to user
    toast.success("Reset link sent to your email!");

    // Redirect user back to login after 2 seconds
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <>
      {/* Toast container to display notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Full height container */}
      <div className="d-flex vh-100">

        {/* ================= LEFT SIDE (Brand Section) ================= */}
        <div className="d-flex flex-column justify-content-center align-items-center bg-white col-md-5 p-5">
          
          {/* Institute Logo */}
          <img src={Logo} alt="Logo" width={120} className="mb-4" />

          {/* Institute Name */}
          <h2 
            className="fw-bold text-center" 
            style={{ color: "#1f2b70" }}
          >
            INSTITUTE<br/>MANAGEMENT SYSTEM
          </h2>
        </div>

        {/* ================= RIGHT SIDE (Forget Password Form) ================= */}
        <div 
          className="d-flex flex-column justify-content-center px-5 col-md-7" 
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>

            {/* Page Heading */}
            <h3 className="fw-bold mb-2">Forget Password</h3>

            {/* Instruction text */}
            <p className="text-white-50 mb-4 small">
              Enter your registered email and we'll send you a link to reset your password.
            </p>

            {/* Forget Password Form */}
            <form onSubmit={handleSubmit}>

              {/* ===== EMAIL INPUT ===== */}
              <div className="mb-4">
                <label className="fw-bold mb-1">Email Address</label>

                {/* Controlled input field */}
                <input
                  type="email"
                  className="form-control border-0 py-2"
                  placeholder="Enter registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* ===== SUBMIT BUTTON ===== */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold mb-4 shadow-sm"
                style={{ backgroundColor: "#2563eb", border: "none" }}
              >
                SEND RESET LINK
              </button>

              {/* ===== BACK TO LOGIN LINK ===== */}
              <div className="text-center">
                <span 
                  className="text-white text-decoration-none small" 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  {/* Back arrow icon */}
                  <FaArrowLeft className="me-2" /> Back to Login
                </span>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

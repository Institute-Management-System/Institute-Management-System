// Import React and useState hook for managing component state
import React, { useState } from "react";

// useNavigate is used for programmatic navigation (redirecting users)
import { useNavigate } from "react-router-dom";

// Toast components for showing popup notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing logo image from assets folder
import Logo from "../assets/Logo.png"; 

// Login functional component
const Login = () => {

  // navigate is used to redirect user after successful login
  const navigate = useNavigate();

  // role state to store selected role (student/teacher/admin)
  const [role, setRole] = useState("student");

  // email state to store email input
  const [email, setEmail] = useState("");

  // password state to store password input
  const [password, setPassword] = useState("");

  // Function executed when login form is submitted
  const handleLogin = (e) => {

    // Prevents page refresh on form submit
    e.preventDefault();

    // Validation: check if email or password is empty
    if (!email || !password) {
      toast.error("Please fill all fields"); // error toast
      return;
    }

    // Success toast showing selected role
    toast.success(`Login Successful as ${role.toUpperCase()}`);

    // Redirecting user based on role
    // Example: /student/dashboard, /teacher/dashboard, /admin/dashboard
    navigate(`/${role}/dashboard`);
  };

  return (
    <>
      {/* Toast container for showing notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Full screen container */}
      <div className="d-flex vh-100">

        {/* ================= LEFT SIDE (Brand Section) ================= */}
        <div className="d-flex flex-column justify-content-center align-items-center bg-white col-md-5 p-5">
          
          {/* Institute Logo */}
          <img src={Logo} alt="Logo" width={120} className="mb-4" />

          {/* Institute Title */}
          <h2 
            className="fw-bold text-center" 
            style={{ color: "#1f2b70" }}
          >
            INSTITUTE<br/>MANAGEMENT SYSTEM
          </h2>
        </div>

        {/* ================= RIGHT SIDE (Login Form) ================= */}
        <div 
          className="d-flex flex-column justify-content-center px-5 col-md-7" 
          style={{ backgroundColor: "#1f2b70", color: "white" }}
        >
          <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
            
            {/* Heading */}
            <h3 className="fw-bold mb-4">Login to your account</h3>
            
            {/* Login Form */}
            <form onSubmit={handleLogin}>
              
              {/* ===== ROLE SELECTION ===== */}
              <div className="mb-3">
                <label className="fw-bold mb-1">Select Role</label>

                {/* Dropdown to select role */}
                <select 
                  className="form-select border-0 py-2" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* ===== EMAIL INPUT ===== */}
              <div className="mb-3">
                <label className="fw-bold mb-1">Email</label>

                {/* Controlled input: value comes from state */}
                <input 
                  className="form-control border-0 py-2" 
                  type="email" 
                  placeholder="Enter Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              {/* ===== PASSWORD INPUT ===== */}
              <div className="mb-2">
                <label className="fw-bold mb-1">Password</label>

                {/* Controlled password input */}
                <input 
                  className="form-control border-0 py-2" 
                  type="password" 
                  placeholder="Enter Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>

              {/* ===== FORGET PASSWORD LINK ===== */}
              <div className="text-end mb-4">
                <span 
                  className="small text-light text-decoration-underline" 
                  style={{ cursor: "pointer", opacity: 0.8 }}
                  onClick={() => navigate("/forget-password")}
                >
                  Forget Password?
                </span>
              </div>

              {/* ===== LOGIN BUTTON ===== */}
              <button 
                className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm" 
                style={{backgroundColor: "#2563eb", border: "none"}}
              >
                LOG IN
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!form.email || !form.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    // Simulate Login
    toast.success("Login Successful!");
    
    // Redirect after short delay
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="row g-0">
          
          {/* LEFT SIDE - BRANDING */}
          <div className="col-md-5 bg-primary d-flex flex-column align-items-center justify-content-center p-5 text-center text-white">
            <div className="bg-white p-3 rounded-circle mb-3 shadow-sm">
              <img src={Logo} alt="Logo" width="60" />
            </div>
            <h3 className="fw-bold mb-0">INSTITUTE</h3>
            <p className="lead opacity-75">Management System</p>
          </div>

          {/* RIGHT SIDE - LOGIN FORM */}
          <div className="col-md-7 bg-white p-5">
            <h3 className="fw-bold text-dark mb-4">Login to Account</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold text-muted">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-muted">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-bold mb-3"
              >
                LOG IN
              </button>

              <div className="d-flex justify-content-between align-items-center">
                <span 
                  className="text-primary fw-bold cursor-pointer" 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/admin/register")}
                >
                  Create Account
                </span>
                <span className="text-muted small" style={{ cursor: "not-allowed" }}>
                  Forgot Password?
                </span>
              </div>
            </form>
          </div>

        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminLogin;
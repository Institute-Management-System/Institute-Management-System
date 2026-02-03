import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match!");
      return;
    }
    
    toast.success("Admin registered successfully!");
    setTimeout(() => navigate("/admin/login"), 2000);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="row g-0">
          
          {/* LEFT SIDE */}
          <div className="col-md-5 bg-white d-flex flex-column align-items-center justify-content-center p-5 text-center">
            <img src={Logo} alt="Logo" className="img-fluid mb-4" width="150" />
            <h3 className="fw-bold text-primary">ADMIN REGISTRATION</h3>
            <p className="text-muted">Join the management system</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-7 bg-primary p-5 text-white">
            <h3 className="fw-bold mb-4">Create Account</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-light text-primary w-100 fw-bold py-2 mb-3"
              >
                REGISTER
              </button>

              <div className="text-center">
                <span 
                  className="text-white text-decoration-underline" 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/admin/login")}
                >
                  Back to Login
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

export default AdminRegister;
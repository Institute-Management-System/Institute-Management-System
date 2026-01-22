import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialNotices = [
  {
    id: 1,
    title: "Holiday Announcement",
    date: "2025-10-17",
    body: "The college will observe a holiday on October 18th for Diwali celebrations. Classes will resume on 24 October.",
  },
  {
    id: 2,
    title: "Exam Schedule Update",
    date: "2025-10-23",
    body: "Exam will be conducted on 24 Oct.",
  },
];

const AdminManageNotices = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(initialNotices);
  const [form, setForm] = useState({
    title: "",
    date: "",
    body: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.body) {
      toast.error("Please fill in all fields");
      return;
    }

    const newNotice = {
      id: Date.now(), // Simple unique ID generation
      title: form.title,
      date: form.date,
      body: form.body,
    };

    setNotices([newNotice, ...notices]); // Add new notice to top
    toast.success("Notice Published Successfully!");
    setForm({ title: "", date: "", body: "" });
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
    toast.info("Notice removed successfully");
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">Manage Notices</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <div className="container mt-4">
        <div className="row g-4">
          
          {/* LEFT SIDE: ADD NOTICE FORM */}
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3 text-primary">Add New Notice</h5>
              <form onSubmit={handleAddNotice}>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter notice title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    name="body"
                    rows={5}
                    className="form-control"
                    value={form.body}
                    onChange={handleChange}
                    placeholder="Enter notice details..."
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fw-bold">
                    Publish Notice
                  </button>
                </div>
              
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: NOTICE LIST */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4 bg-light">
              <h5 className="fw-bold mb-3">Recent Notices</h5>
              
              <div className="overflow-auto" style={{ maxHeight: "600px" }}>
                {notices.length > 0 ? (
                  notices.map((n) => (
                    <div key={n.id} className="card border-0 shadow-sm mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold text-dark mb-0">{n.title}</h6>
                          <button 
                            className="btn btn-sm text-danger p-0"
                            onClick={() => handleDelete(n.id)}
                            title="Delete Notice"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                        <span className="badge bg-secondary mb-2">{n.date}</span>
                        <p className="card-text text-muted small">{n.body}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted">
                    <p>No notices available.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminManageNotices;
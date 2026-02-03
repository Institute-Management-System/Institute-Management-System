import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "../../services/admin.service";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AdminManageNotices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  /* ================= STATE ================= */
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    body: "",
    targetRole: "ALL", // Default target role
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await AdminService.getAllNotices();
      setNotices(response.data);
    } catch (error) {
      console.error(error);
      toast.error(t('failed_load_notices'));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.body) {
      toast.error(t('please_fill_required'));
      return;
    }

    const newNotice = {
      title: form.title,
      publishDate: form.date,
      description: form.body,
      targetRole: form.targetRole, // Use selected target role
      status: true
    };

    try {
      await AdminService.addNotice(newNotice);
      toast.success(t('notice_published_success'));
      setForm({ title: "", date: "", body: "", targetRole: "ALL" });
      fetchNotices();
    } catch (error) {
      toast.error(t('failed_publish_notice'));
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await AdminService.deleteNotice(id); // Using existing endpoint which now toggles
      toast.success(`${t('notice_status_updated')} ${!currentStatus ? t('active') : t('inactive')}`);
      fetchNotices();
    } catch (error) {
      toast.error(t('failed_update_notice_status'));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('manage_notices')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-4">
        <div className="row g-4">

          {/* LEFT SIDE: ADD NOTICE FORM */}
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3 text-primary">{t('add_new_notice')}</h5>
              <form onSubmit={handleAddNotice}>

                <div className="mb-3">
                  <label className="form-label fw-bold">{t('notice_title')}</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                    placeholder={t('enter_notice_title')}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">{t('target_audience')}</label>
                  <select
                    name="targetRole"
                    className="form-select"
                    value={form.targetRole}
                    onChange={handleChange}
                    required
                  >
                    <option value="ALL">{t('all_users')}</option>
                    <option value="STUDENT">{t('students_only')}</option>
                    <option value="TEACHER">{t('teachers_only')}</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">{t('publish_date')}</label>
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
                  <label className="form-label fw-bold">{t('description')}</label>
                  <textarea
                    name="body"
                    rows={5}
                    className="form-control"
                    value={form.body}
                    onChange={handleChange}
                    placeholder={t('enter_notice_details')}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fw-bold">
                    {t('publish_notice')}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT SIDE: NOTICE LIST */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4 bg-light">
              <h5 className="fw-bold mb-3">{t('recent_notices')}</h5>

              <div className="overflow-auto" style={{ maxHeight: "600px" }}>
                {notices.length > 0 ? (
                  notices.map((n) => (
                    <div key={n.id} className="card border-0 shadow-sm mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold text-dark mb-0">{n.title}</h6>
                          <button
                            className={`btn btn-sm fw-bold ${n.status ? "btn-success" : "btn-secondary"}`}
                            onClick={() => handleToggleStatus(n.id, n.status)}
                            title={t('toggle_status')}
                          >
                            {n.status ? t('active') : t('inactive')}
                          </button>
                        </div>
                        <div className="mb-2">
                          <span className="badge bg-secondary me-2">{n.publishDate}</span>
                          <span className={`badge ${n.targetRole === 'STUDENT' ? 'bg-info' : n.targetRole === 'TEACHER' ? 'bg-warning text-dark' : 'bg-success'}`}>
                            {n.targetRole || 'ALL'}
                          </span>
                        </div>
                        <p className="card-text text-muted small">{n.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted">
                    <p>{t('no_notices')}</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div >
      <ToastContainer position="top-right" autoClose={2000} />
    </div >
  );
};

export default AdminManageNotices;
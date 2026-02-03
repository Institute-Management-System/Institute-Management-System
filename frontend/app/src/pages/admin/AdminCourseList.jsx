import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";
import { useEffect } from "react";

const AdminCourseList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await AdminService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_courses'));
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await AdminService.getAllSubjects();
      setSubjects(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_subjects'));
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await AdminService.toggleCourseStatus(id);
      toast.success(`${t('course_status_updated')} ${!currentStatus ? t('active') : t('inactive')}`);
      fetchCourses();
    } catch (error) {
      toast.error(t('failed_update_course_status'));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{t('course_list')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary fw-bold"
            // FIXED: Path changed from /admin/course/add to /admin/courses/add
            onClick={() => navigate("/admin/courses/add")}
          >
            {t('add_new_course')}
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th className="py-3">{t('id')}</th>
                  <th className="py-3">{t('courses')}</th>
                  <th className="py-3">{t('subjects')}</th>
                  <th className="py-3">{t('duration')}</th>
                  <th className="py-3 text-start">{t('description')}</th>
                  <th className="py-3">{t('fees_currency')}</th>
                  <th className="py-3">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td className="fw-bold">{c.name}</td>
                      <td>
                        {subjects
                          .filter((s) => s.course?.id === c.id)
                          .map((s) => s.name)
                          .join(", ") || <span className="text-muted fst-italic">{t('no_subjects')}</span>}
                      </td>
                      <td>{c.duration}</td>
                      <td className="text-start">{c.description}</td>
                      <td>{c.fees}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title={t('edit')}
                            onClick={() => navigate(`/admin/courses/edit/${c.id}`)}
                          >
                            <i className="bi bi-pencil">{t('edit')}</i>
                          </button>
                          <button
                            className={`btn btn-sm fw-bold ${c.status ? "btn-success" : "btn-secondary"}`}
                            onClick={() => handleToggleStatus(c.id, c.status)}
                            style={{ minWidth: "90px" }}
                          >
                            {c.status ? t('active') : t('inactive')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-muted py-4">
                      {t('no_courses_found')}
                    </td>
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

export default AdminCourseList;
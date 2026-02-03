import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";
import { useEffect } from "react";

const AdminSubjectList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await AdminService.getAllSubjects();
      setSubjects(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_subjects'));
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await AdminService.getAllTeachers();
      setTeachers(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_teachers'));
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await AdminService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_courses'));
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await AdminService.toggleSubjectStatus(id);
      toast.success(`${t('subject_status_updated')} ${!currentStatus ? t('active') : t('inactive')}`);
      fetchSubjects();
    } catch (error) {
      toast.error(t('failed_update_subject_status'));
    }
  };



  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{t('subject_list')}</h3>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate("/admin/subjects/manage")}>
            {t('add_new_subject')}
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            {t('back')}
          </button>
        </div>
      </header>

      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="py-3">{t('subject_id')}</th>
                    <th className="py-3">{t('subject_name')}</th>
                    <th className="py-3">{t('courses')}</th>
                    <th className="py-3">{t('assigned_teacher')}</th>
                    <th className="py-3">{t('schedule')}</th>
                    <th className="py-3">{t('action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subj) => (
                    <tr key={subj.id}>
                      <td>{subj.id}</td>
                      <td className="fw-bold text-start ps-5">{subj.name}</td>
                      <td>
                        {subj.course?.name || (
                          <span className="text-muted">–</span>
                        )}
                      </td>
                      <td>
                        {subj.teacher?.fullName || (
                          <span className="text-muted fst-italic">{t('not_assigned')}</span>
                        )}
                      </td>
                      <td>
                        {subj.schedulePath ? (
                          <a
                            href={`http://localhost:8080/api${subj.schedulePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-info text-white"
                          >
                            {t('download')}
                          </a>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => navigate(`/admin/subjects/edit/${subj.id}`)}
                        >
                          {t('edit')}
                        </button>
                        <button
                          className={`btn btn-sm fw-bold ${subj.status ? "btn-success" : "btn-secondary"}`}
                          onClick={() => handleToggleStatus(subj.id, subj.status)}
                          style={{ minWidth: "90px" }}
                        >
                          {subj.status ? t('active') : t('inactive')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div >
  );
};
export default AdminSubjectList;
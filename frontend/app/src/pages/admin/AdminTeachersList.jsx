import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";
import { useEffect } from "react";

const AdminTeachersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await AdminService.getAllTeachers();
      setTeachers(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_teachers'));
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await AdminService.toggleUserStatus(id);
      toast.success(`${t('teacher_status_updated')} ${!currentStatus ? t('active') : t('inactive')}`);
      fetchTeachers();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('are_you_sure_remove_teacher'))) {
      try {
        await AdminService.deleteTeacher(id);
        toast.success(t('teacher_removed_success'));
        fetchTeachers();
      } catch (error) {
        toast.error(t('failed_delete_teacher'));
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('teachers_list')}</h3>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate("/admin/teachers/add")}>{t('add_teacher')}</button>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>{t('back')}</button>
        </div>
      </header>

      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>{t('id')}</th>
                    <th>{t('full_name')}</th>
                    <th>{t('joining_date')}</th>
                    <th>{t('gender')}</th>
                    <th>{t('email_address')}</th>
                    <th>{t('mobile')}</th>
                    <th>{t('qualification')}</th>
                    <th>{t('address')}</th>
                    <th>{t('status')}</th>
                    <th>{t('header_actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td>{teacher.id}</td>
                      <td className="fw-bold">{teacher.fullName}</td>
                      <td>{teacher.admissionDate}</td>
                      <td>{teacher.gender}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.phone}</td>
                      <td>{teacher.qualification || "N/A"}</td>
                      <td>{teacher.address}</td>
                      <td>
                        <button
                          className={`btn btn-sm fw-bold ${teacher.status ? "btn-success" : "btn-secondary"}`}
                          onClick={() => handleToggleStatus(teacher.id, teacher.status)}
                          style={{ minWidth: "90px" }}
                        >
                          {teacher.status ? t('active') : t('inactive')}
                        </button>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                            onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}
                          >
                            <i className="bi bi-pencil">{t('edit')}</i>
                          </button>
                        </div>
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
    </div>
  );
};

export default AdminTeachersList;
import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AdminStudentList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await AdminService.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      const errMsg = error.response
        ? `Error ${error.response.status}: ${error.response.data.message || error.message}`
        : t('network_error');
      toast.error(errMsg);
    }
  };

  // Log students state to verify data
  console.log("Students State:", students);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await AdminService.toggleUserStatus(id);
      toast.success(`${t('user_status_updated')} ${!currentStatus ? t('active') : t('inactive')}`);
      fetchStudents(); // Refresh list to show updated status
    } catch (error) {
      console.error("Toggle Status Error:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('are_you_sure_delete'))) {
      try {
        await AdminService.deleteStudent(id);
        toast.success(t('student_record_deleted'));
        fetchStudents(); // Refresh list
      } catch (error) {
        toast.error("Failed to delete student");
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{t('student_list')}</h3>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate("/admin/students/add")}>{t('add_student')}</button>
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
                    <th>{t('roll_no')}</th>
                    <th>{t('full_name')}</th>
                    <th>{t('dob')}</th>
                    <th>{t('gender')}</th>
                    <th>{t('email_address')}</th>
                    <th>{t('phone')}</th>
                    <th>{t('address')}</th>
                    <th>{t('status')}</th>
                    <th>{t('action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.rollNumber || s.id}</td>
                      <td className="fw-bold">{s.fullName}</td>
                      <td>{s.dob}</td>
                      <td>{s.gender}</td>
                      <td>{s.email}</td>
                      <td>{s.phone}</td>
                      <td>{s.address}</td>
                      <td>
                        <button
                          className={`btn btn-sm fw-bold ${s.status ? "btn-success" : "btn-secondary"}`}
                          onClick={() => handleToggleStatus(s.id, s.status)}
                          style={{ minWidth: "90px" }}
                        >
                          {s.status ? t('active') : t('inactive')}
                        </button>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                            onClick={() => navigate(`/admin/students/edit/${s.id}`)}
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

export default AdminStudentList;
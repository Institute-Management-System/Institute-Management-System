import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import AdminService from '../../services/admin.service';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const AdminTeacherAttendance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await AdminService.getTeacherAttendanceList();
      setAttendanceData(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_attendance'));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('teacher_attendance')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3">{t('id')}</th>
                  <th className="py-3">{t('teachers')}</th>
                  <th className="py-3">{t('attendance_percentage')}</th>
                  <th className="py-3">{t('status')}</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{record.id}</td>
                    <td>{record.fullName}</td>
                    <td className="fw-bold text-primary">{record.attendancePercentage}%</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 ${record.attendancePercentage >= 90
                          ? 'bg-success'
                          : record.attendancePercentage >= 80
                            ? 'bg-primary'
                            : 'bg-warning text-dark'
                          }`}
                      >
                        {record.attendancePercentage >= 90 ? t('status_excellent') : record.attendancePercentage >= 80 ? t('status_good') : t('status_needs_improve')}
                      </span>
                    </td>
                  </tr>
                ))}
                {attendanceData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4">{t('no_attendance_records')}</td>
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

export default AdminTeacherAttendance;
import React from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminStudentDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = [
    {
      title: t('view_student'),
      path: "/admin/students/list",
      color: "bg-primary"
    },
    {
      title: t('add_student'),
      path: "/admin/students/add",
      color: "bg-success"
    },
    {
      title: t('view_marks'),
      path: "/admin/students/marks",
      color: "bg-info"
    },
    {
      title: t('feedback'),
      path: "/admin/feedbacks",
      color: "bg-warning"
    },

    {
      title: t('student_attendance'),
      path: "/admin/students/attendance",
      color: "bg-secondary"
    },
  ];

  return (
    <div className="container-fluid p-0">
      {/* HEADER */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{t('student_management')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      {/* CARDS GRID */}
      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          {cards.map((card, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div
                className={`card shadow-sm border-0 h-100 text-center p-4 hover-shadow ${card.color} text-white`}
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => navigate(card.path)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <h5 className="fw-bold">{card.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentDashboard;
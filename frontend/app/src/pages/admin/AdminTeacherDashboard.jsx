import React from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminTeacherDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = [
    { title: t('view_teacher'), path: "/admin/teachers/list", color: "bg-primary" },
    { title: t('add_teacher'), path: "/admin/teachers/add", color: "bg-success" },
    { title: t('teacher_attendance'), path: "/admin/teachers/attendance", color: "bg-info" },
    // Removed Feedback Card
  ];

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} width={45} alt="Logo" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('teacher_management')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>{t('back')}</button>
      </header>

      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          {cards.map((card, index) => (
            <div key={index} className="col-md-5 col-sm-6">
              <div
                className={`card shadow-sm border-0 h-100 p-5 text-center ${card.color} text-white`}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => navigate(card.path)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <h4 className="fw-bold">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherDashboard;
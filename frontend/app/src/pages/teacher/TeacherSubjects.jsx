import React from "react";
import Logo from "../../assets/Logo.png";

const subjects = [
  { id: 1, course: "PG-DAC", date: "01-02-2025", subject: "Core Java" },
  { id: 2, course: "PG-DMC", date: "02-03-2025", subject: "Core Java" },
  { id: 3, course: "PG-DBDA", date: "04-05-2025", subject: "Python" },
  { id: 4, course: "PG-DAC", date: "06-07-2025", subject: "Advance Java" },
];

const TeacherSubjects = () => {
  return (
    <>
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>View Assigned Subjects</h4>
      </div>

      <div className="card card-custom p-4">
        <div className="table-responsive">
          <table className="table table-custom table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Course</th>
                <th>Date</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.course}</td>
                  <td>{s.date}</td>
                  <td className="fw-bold text-primary">{s.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeacherSubjects;
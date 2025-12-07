import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { toast } from "react-toastify";

const initialStudents = [
  { roll: 1, name: "Aarav Sharma", status: "Pass" },
  { roll: 2, name: "Diya Patel", status: "Fail" },
  { roll: 3, name: "Rohan Mehra", status: "Pass" },
  { roll: 4, name: "Ananya Singh", status: "Pass" },
];

const TeacherEvaluateStudent = () => {
  const [marks, setMarks] = useState({});

  const handleMarkChange = (roll, value) => {
    setMarks((prev) => ({ ...prev, [roll]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Marks Submitted Successfully!");
  };

  return (
    <>
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>Evaluate Student</h4>
      </div>

      <div className="container-fluid p-0">
        <div className="card card-custom p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold text-muted small">Course Name</label>
                <input type="text" className="form-control" placeholder="Enter Course Name" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold text-muted small">Subject Name</label>
                <input type="text" className="form-control" placeholder="Enter Subject Name" />
              </div>
            </div>

            <h5 className="fw-bold mb-3 text-dark">Student Marks :</h5>
            <p className="text-muted small mb-3">Enter marks for the selected subject</p>

            <div className="table-responsive">
              <table className="table table-custom table-bordered align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "80px" }}>Roll No.</th>
                    <th>Student Name</th>
                    <th style={{ width: "200px" }}>Marks (Out Of 100)</th>
                    <th style={{ width: "150px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {initialStudents.map((s) => (
                    <tr key={s.roll}>
                      <td className="text-center">{s.roll}</td>
                      <td className="fw-bold text-dark">{s.name}</td>
                      <td>
                        <input
                          type="number"
                          min="0" max="100"
                          className="form-control text-center"
                          value={marks[s.roll] || ""}
                          onChange={(e) => handleMarkChange(s.roll, e.target.value)}
                          placeholder="0"
                        />
                      </td>
                      <td className={s.status === "Pass" ? "text-success fw-bold" : "text-danger fw-bold"}>
                        {s.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-navy px-5 py-2 fw-bold">Submit Marks</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherEvaluateStudent;

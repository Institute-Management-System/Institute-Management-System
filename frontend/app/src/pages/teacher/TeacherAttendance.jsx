import React from "react";
import Logo from "../../assets/Logo.png";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const attendance = [
  { index: 1, month: "January", attendance: "85%" },
  { index: 2, month: "February", attendance: "90%" },
  { index: 3, month: "March", attendance: "70%" },
  { index: 4, month: "April", attendance: "65%" },
  { index: 5, month: "May", attendance: "87%" },
];

const TeacherAttendance = () => {
  return (
    <>
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <div className="d-flex justify-content-between w-100 align-items-center">
            <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>Attendance Record</h4>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2" onClick={() => toast.info("Downloading Monthly Report...")}>
                    <FaFilePdf /> Monthly Report
                </button>
                <button className="btn btn-danger btn-sm d-flex align-items-center gap-2" onClick={() => toast.info("Downloading Overall Report...")}>
                    <FaDownload /> Overall Report
                </button>
            </div>
        </div>
      </div>

      <div className="card card-custom p-4">
        <div className="table-responsive">
          <table className="table table-custom table-hover mb-0">
            <thead>
              <tr>
                <th className="text-center">Index</th>
                <th className="text-center">Month</th>
                <th className="text-center">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.index}>
                  <td className="text-center">{a.index}</td>
                  <td className="text-center fw-bold text-dark">{a.month}</td>
                  <td className="text-center">
                    <span className={`badge rounded-pill ${parseInt(a.attendance) > 80 ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {a.attendance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeacherAttendance;
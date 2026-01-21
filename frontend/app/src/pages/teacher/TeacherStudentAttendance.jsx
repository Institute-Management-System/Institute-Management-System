import React, { useState, useEffect } from "react";
// useState  -> to store attendance data in component state
// useEffect -> to fetch/load data when component loads

import Logo from "../../assets/Logo.png";
// Institute logo image for header section

import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> container for toast messages on screen
// toast -> used to show success/error notification messages

import "react-toastify/dist/ReactToastify.css";
// react-toastify default styling

const TeacherStudentAttendance = () => {

  // attendanceRecords holds the list of student attendance entries
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // useEffect runs once when component is loaded (because dependency array is empty)
  useEffect(() => {

    // Dummy attendance data (in real project it will come from backend API)
    const fetchedData = [
      { id: 101, name: "Aarav Sharma", course: "PG-DAC", date: "01-02-2025", status: "Present", percentage: "85%" },
      { id: 102, name: "Diya Patel", course: "PG-DMC", date: "01-02-2025", status: "Absent", percentage: "90%" },
      { id: 103, name: "Rohan Mehra", course: "PG-DBDA", date: "01-02-2025", status: "Present", percentage: "70%" },
      { id: 104, name: "Ananya Singh", course: "PG-DAC", date: "01-02-2025", status: "Present", percentage: "65%" },
      { id: 105, name: "Vikram Malhotra", course: "PG-DAC", date: "01-02-2025", status: "Absent", percentage: "75%" },
    ];

    // storing fetched data into state
    setAttendanceRecords(fetchedData);
  }, []); // [] ensures it runs only once

  // function for download report button
  const handleDownload = () => {
    // currently only toast message is shown (later you can implement real file download)
    toast.success("Attendance Report Downloaded Successfully");
  };

  return (
    <>
      {/* Toast message container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header Section */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        {/* Logo */}
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />

        {/* Title */}
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          Student Attendance
        </h4>
      </div>

      {/* Main Card for Attendance Table */}
      <div className="card card-custom p-4">

        {/* Responsive table wrapper */}
        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle mb-0">

            {/* Table Header */}
            <thead className="table-light">
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
                <th>Overall %</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {attendanceRecords.length > 0 ? (

                // if attendance records exist -> display rows
                attendanceRecords.map((r) => (
                  <tr key={r.id}>

                    {/* Roll number */}
                    <td>{r.id}</td>

                    {/* Student name */}
                    <td className="fw-bold text-dark">{r.name}</td>

                    {/* Course */}
                    <td>{r.course}</td>

                    {/* Date */}
                    <td>{r.date}</td>

                    {/* Attendance status (Present/Absent) */}
                    <td>
                      <span
                        // badge color based on present/absent
                        className={`badge rounded-pill ${
                          r.status === "Present" ? "bg-success" : "bg-danger"
                        }`}
                        style={{ minWidth: "80px" }}
                      >
                        {r.status}
                      </span>
                    </td>

                    {/* Overall attendance percentage */}
                    <td className="fw-bold">{r.percentage}</td>
                  </tr>
                ))
              ) : (

                // if no records -> display message
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Download button section */}
        <div className="mt-4 text-end">
          <button 
            className="btn text-white btn-sm px-4 py-2 fw-bold shadow-sm" 
            style={{ backgroundColor: "#1a237e" }} 
            onClick={handleDownload} // triggers toast message
          >
            Download Report
          </button>
        </div>
      </div>
    </>
  );
};

export default TeacherStudentAttendance;
// export component so it can be used in routes/pages

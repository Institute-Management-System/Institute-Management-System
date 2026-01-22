import React, { useState, useEffect } from "react";
// useState  -> to store subjects data in state
// useEffect -> to load/fetch data when component loads

import Logo from "../../assets/Logo.png";
// Institute logo image

import { ToastContainer } from "react-toastify";
// ToastContainer -> container to show toast notifications

import "react-toastify/dist/ReactToastify.css";
// Toastify default styling

const TeacherSubjects = () => {

  // subjects -> list of assigned subjects for teacher
  const [subjects, setSubjects] = useState([]);

  // useEffect runs only once when component loads (because dependency array is [])
  useEffect(() => {

    // Dummy subjects data (in real project it will come from backend API)
    const fetchedData = [
      { id: 101, course: "PG-DAC", date: "01-02-2025", subject: "Core Java" },
      { id: 102, course: "PG-DMC", date: "02-03-2025", subject: "Web Technologies" },
      { id: 103, course: "PG-DBDA", date: "04-05-2025", subject: "Python Programming" },
      { id: 104, course: "PG-DAC", date: "06-07-2025", subject: "Advance Java" },
      { id: 105, course: "PG-DESD", date: "10-08-2025", subject: "Operating Systems" },
    ];

    // store fetched subjects in state
    setSubjects(fetchedData);
  }, []); // empty array -> run once only

  return (
    <>
      {/* Toast container to show toast messages */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page header section */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">

        {/* Logo */}
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />

        {/* Page title */}
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          Assigned Subjects
        </h4>
      </div>

      {/* Main card for subjects table */}
      <div className="card card-custom p-4">

        {/* Table responsive for small screens */}
        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle mb-0">

            {/* Table headings */}
            <thead className="table-light">
              <tr>
                <th style={{ width: "100px" }}>ID</th>
                <th>Course Name</th>
                <th>Start Date</th>
                <th>Subject Name</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {subjects.length > 0 ? (

                // If subjects list is not empty -> map each subject in table row
                subjects.map((s) => (
                  <tr key={s.id}>

                    {/* Subject ID */}
                    <td>{s.id}</td>

                    {/* Course name shown in badge */}
                    <td>
                      <span className="badge bg-light text-dark border">
                        {s.course}
                      </span>
                    </td>

                    {/* Start date */}
                    <td>{s.date}</td>

                    {/* Subject name highlighted */}
                    <td className="fw-bold" style={{ color: "#1a237e" }}>
                      {s.subject}
                    </td>
                  </tr>
                ))
              ) : (

                // If no subjects assigned -> show message row
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    No subjects assigned yet.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};

export default TeacherSubjects;
// Exporting component so it can be used in routing/pages

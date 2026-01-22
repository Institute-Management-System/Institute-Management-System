import React, { useState, useEffect } from "react";
// useState  -> to store schedule data in component state
// useEffect -> to fetch/load schedule data when component loads

import Logo from "../../assets/Logo.png";
// Institute logo for header section

import { FaFileAlt } from "react-icons/fa";
// File icon for timetable/view schedule button

import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> required to display toast messages
// toast -> used to show popup notifications (info/success)

import "react-toastify/dist/ReactToastify.css";
// Toastify default styling

const TeacherSchedule = () => {

  // scheduleData holds list of schedule objects
  const [scheduleData, setScheduleData] = useState([]);

  // useEffect runs once when component loads (dependency array is empty)
  useEffect(() => {

    // Dummy schedule data (in real project this will come from backend API)
    const fetchedData = [
      { id: 101, course: "PG-DAC", subject: "Core Java", duration: "3 weeks" },
      { id: 102, course: "PG-DAC", subject: "Web Programming", duration: "2 weeks" },
      { id: 103, course: "PG-DBDA", subject: "Python", duration: "1 week" },
      { id: 104, course: "PG-DMC", subject: "Advance Java", duration: "4 weeks" },
      { id: 105, course: "PG-DESD", subject: "Embedded C", duration: "3 weeks" },
    ];

    // store schedule data inside state
    setScheduleData(fetchedData);
  }, []); // [] means this will run only once on initial render

  // this function runs when teacher clicks timetable icon button
  const handleViewTimetable = (subject) => {
    // currently only showing toast message
    // later we can open a timetable page or modal
    toast.info(`Opening schedule for ${subject}...`);
  };

  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        {/* Logo */}
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />

        {/* Title */}
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          Class Schedule
        </h4>
      </div>

      {/* Main card containing schedule table */}
      <div className="card card-custom p-4">

        {/* Table wrapper for responsiveness */}
        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle mb-0">

            {/* Table Header */}
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Course Name</th>
                <th>Subject Name</th>
                <th>Duration</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {scheduleData.length > 0 ? (

                // If schedule data exists -> map and show rows
                scheduleData.map((row) => (
                  <tr key={row.id}>

                    {/* Schedule ID */}
                    <td>{row.id}</td>

                    {/* Course name */}
                    <td className="fw-semibold">{row.course}</td>

                    {/* Subject name */}
                    <td style={{ color: "#1a237e" }}>{row.subject}</td>

                    {/* Duration shown in badge */}
                    <td>
                      <span className="badge bg-light text-dark border px-3">
                        {row.duration}
                      </span>
                    </td>

                    {/* Action button to view timetable */}
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-light border shadow-sm"
                        // on click call handler with subject name
                        onClick={() => handleViewTimetable(row.subject)}
                        title="View Timetable"
                      >
                        {/* timetable icon */}
                        <FaFileAlt className="text-secondary" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (

                // If scheduleData is empty -> show message
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No schedule available.
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

export default TeacherSchedule;
// exporting component so it can be used in other files/routes

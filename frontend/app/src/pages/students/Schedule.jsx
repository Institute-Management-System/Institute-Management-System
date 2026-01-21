// Import React hooks for state management and lifecycle handling
import React, { useState, useEffect } from 'react';

// Icon for timetable/download button
import { FaFileAlt } from 'react-icons/fa';

// Toast notification utilities
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Schedule component
const Schedule = () => {

  // State to store schedule data (table rows)
  const [schedules, setSchedules] = useState([]);

  // useEffect runs once when component mounts
  useEffect(() => {

    // Dummy schedule data (can be replaced by API later)
    const fetchedData = [
      { id: 101, course: 'PG-DAC', subject: 'Core Java', duration: '2 months' },
      { id: 102, course: 'PG-DAC', subject: 'Web Technologies', duration: '3 months' },
      { id: 103, course: 'PG-DAC', subject: 'Python', duration: '1 week' },
      { id: 104, course: 'PG-DAC', subject: 'Advance Java', duration: '4 weeks' },
    ];

    // Store data into state
    setSchedules(fetchedData);
  }, []); // Empty dependency array → runs only once

  // Function called when download button is clicked
  const handleDownload = (subject) => {

    // Show toast notification (only UI feedback, no actual download)
    toast.info(`Downloading schedule for ${subject}...`);
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Card container */}
      <div className="card card-custom p-4">

        {/* Card heading */}
        <h5 className="mb-4 fw-bold">Class Schedule</h5>

        {/* Makes table scrollable on small screens */}
        <div className="table-responsive">

          {/* Schedule table */}
          <table className="table table-custom table-hover align-middle">

            {/* Table header */}
            <thead className="table-light">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">COURSE</th>
                <th className="text-center">SUBJECT</th>
                <th className="text-center">DURATION</th>
                <th className="text-center">TIMETABLE</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>

              {/* Loop through schedule list */}
              {schedules.map((row, index) => (
                <tr key={row.id}>

                  {/* Serial number (not database ID) */}
                  <td className="text-center">{index + 1}</td>

                  {/* Course name */}
                  <td className="text-center">{row.course}</td>

                  {/* Subject name */}
                  <td className="text-center fw-semibold">{row.subject}</td>

                  {/* Duration displayed as badge */}
                  <td className="text-center">
                    <span className="badge bg-light text-dark border">
                      {row.duration}
                    </span>
                  </td>

                  {/* Download button */}
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-light border shadow-sm"
                      onClick={() => handleDownload(row.subject)}
                      title="Download Timetable"
                    >
                      {/* File icon */}
                      <FaFileAlt size={18} className="text-secondary" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Message when no schedules are available */}
              {schedules.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No schedules available.
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

// Export component
export default Schedule;

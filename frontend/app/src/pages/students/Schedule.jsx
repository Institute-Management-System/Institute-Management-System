// Import React and required hooks
import React, { useState, useEffect } from 'react';

// Icon for download button
import { FaFileAlt } from 'react-icons/fa';

// Toast notifications for user feedback
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Schedule = () => {

  // State to store schedule data (subjects list)
  const [schedules, setSchedules] = useState([]);

  // Runs once when component mounts
  useEffect(() => {
    // Mock data (later this can come from backend API)
    const fetchedData = [
      { id: 101, course: 'PG-DAC', subject: 'Core Java', duration: '2 months' },
      { id: 102, course: 'PG-DAC', subject: 'Web Technologies', duration: '3 months' },
      { id: 103, course: 'PG-DAC', subject: 'Python', duration: '1 week' },
      { id: 104, course: 'PG-DAC', subject: 'Advance Java', duration: '4 weeks' },
    ];

    // Save fetched data into state
    setSchedules(fetchedData);
  }, []);

  // Handles timetable download click
  const handleDownload = () => {
    // Shows toast message (simulating download)
    toast.info('Downloading full timetable...');
  };

  return (
    <>
      {/* Toast container to display notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card card-custom p-4">
        
        {/* Page Title */}
        <h5 className="fw-bold mb-2">Class Schedule</h5>

        {/* Common timetable section (shown once, not per row) */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="fw-semibold">Timetable:</span>

          {/* Download button for full timetable */}
          <button
            className="btn btn-sm btn-light border shadow-sm"
            onClick={handleDownload}
            title="Download Timetable"
          >
            <FaFileAlt className="me-1" />
            Download
          </button>
        </div>

        {/* Table wrapper for responsiveness */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            
            {/* Table header */}
            <thead className="table-light">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">COURSE</th>
                <th className="text-center">SUBJECT</th>
                <th className="text-center">DURATION</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {/* Looping through schedules array */}
              {schedules.map((row, index) => (
                <tr key={row.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{row.course}</td>
                  <td className="text-center fw-semibold">{row.subject}</td>
                  <td className="text-center">{row.duration}</td>
                </tr>
              ))}

              {/* Message when no data is available */}
              {schedules.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
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

export default Schedule;

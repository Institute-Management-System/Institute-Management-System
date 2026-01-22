// Import React and hooks for state management and lifecycle
import React, { useState, useEffect } from 'react';

// Marks component
const Marks = () => {

  // State to store marks data
  const [marks, setMarks] = useState([]);

  // useEffect runs once when component mounts
  useEffect(() => {

    // Mock data simulating marks fetched from backend/database
    const fetchedData = [
      { id: 1, course: 'PG-DAC', subject: 'Core Java', obtained: 80, total: 100 },
      { id: 2, course: 'PG-DAC', subject: 'Web Tech', obtained: 75, total: 100 },
      { id: 3, course: 'PG-DAC', subject: 'Python', obtained: 90, total: 100 },
      { id: 4, course: 'PG-DAC', subject: 'Advance Java', obtained: 60, total: 100 },
    ];

    // Update state with fetched marks
    setMarks(fetchedData);

  }, []); // Empty dependency array → runs only once

  return (
    // Card container for UI
    <div className="card card-custom p-4">

      {/* Card title */}
      <h5 className="mb-4 fw-bold">Student Marks</h5>

      {/* Responsive table wrapper */}
      <div className="table-responsive">

        {/* Marks table */}
        <table className="table table-custom table-hover align-middle">

          {/* Table header */}
          <thead className="table-light">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">COURSE</th>
              <th className="text-center">SUBJECT</th>
              <th className="text-center">OBTAINED</th>
              <th className="text-center">TOTAL</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>

            {/* Loop through marks data */}
            {marks.map((row) => (
              <tr key={row.id}>
                <td className="text-center">{row.id}</td>
                <td className="text-center">{row.course}</td>
                <td className="text-center fw-semibold">{row.subject}</td>
                <td className="text-center text-primary fw-bold">{row.obtained}</td>
                <td className="text-center">{row.total}</td>
              </tr>
            ))}

            {/* Message shown if no marks data is available */}
            {marks.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No marks available
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export Marks component
export default Marks;

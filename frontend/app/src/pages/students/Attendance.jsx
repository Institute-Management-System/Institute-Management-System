// Import React hooks for managing state and lifecycle
import React, { useState, useEffect } from 'react';

// Toast notification utilities
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Attendance component
const Attendance = () => {

  // State to store attendance records
  const [data, setData] = useState([]);

  // State to store selected month filter
  const [monthFilter, setMonthFilter] = useState('All');

  // useEffect runs once when component loads
  useEffect(() => {

    // Mock data simulating backend / database response
    const mockDbResponse = [
      { id: 101, subject: 'Java', date: '12-01-2025', status: 'Present' },
      { id: 102, subject: 'Python', date: '15-01-2025', status: 'Absent' },
      { id: 103, subject: 'Java', date: '02-02-2025', status: 'Present' },
      { id: 104, subject: 'C++', date: '10-02-2025', status: 'Present' },
      { id: 105, subject: 'React', date: '20-03-2025', status: 'Present' },
      { id: 106, subject: 'DevOps', date: '05-08-2025', status: 'Present' },
      { id: 107, subject: 'Cloud', date: '11-11-2025', status: 'Absent' },
    ];

    // Store fetched data in state
    setData(mockDbResponse);
  }, []); // Empty dependency array → runs only once

  // Called when month dropdown value changes
  const handleFilterChange = (e) => {
    const selected = e.target.value;

    // Update selected month filter
    setMonthFilter(selected);

    // Get selected month name from dropdown
    const monthName = e.target.options[e.target.selectedIndex].text;

    // Show toast notification
    toast.info(`Showing attendance for: ${monthName}`);
  };

  // Filter data based on selected month
  // If "All", show full data
  const filteredList = monthFilter === 'All' 
    ? data 
    : data.filter(item => item.date.split('-')[1] === monthFilter);

  // Total records after filter
  const total = filteredList.length;

  // Count of present records
  const present = filteredList.filter(item => item.status === 'Present').length;

  // Absent count derived from total - present
  const absent = total - present;

  // Attendance percentage calculation
  const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(1);

  return (
    <>
      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Main card container */}
      <div className="card card-custom p-4 shadow-sm">

        {/* Header section with title and month filter */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Attendance Tracker</h5>

          {/* Month filter dropdown */}
          <select 
            className="form-select w-auto shadow-sm"
            value={monthFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All Months</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Summary statistics section */}
        <div className="row text-center mb-4">

          {/* Total count */}
          <div className="col-3">
            <div className="p-3 bg-light rounded">
              <h6 className="text-muted">Total</h6>
              <h4 className="fw-bold">{total}</h4>
            </div>
          </div>

          {/* Present count */}
          <div className="col-3">
            <div className="p-3 bg-success bg-opacity-10 rounded">
              <h6 className="text-success">Present</h6>
              <h4 className="fw-bold text-success">{present}</h4>
            </div>
          </div>

          {/* Absent count */}
          <div className="col-3">
            <div className="p-3 bg-danger bg-opacity-10 rounded">
              <h6 className="text-danger">Absent</h6>
              <h4 className="fw-bold text-danger">{absent}</h4>
            </div>
          </div>

          {/* Attendance percentage */}
          <div className="col-3">
            <div className="p-3 bg-primary bg-opacity-10 rounded">
              <h6 className="text-primary">Percent</h6>
              <h4 className="fw-bold text-primary">{percentage}%</h4>
            </div>
          </div>
        </div>

        {/* Attendance table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle border">

            {/* Table header */}
            <thead className="table-light">
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>

              {/* Loop through filtered attendance records */}
              {filteredList.map((row) => (
                <tr key={row.id}>
                  <td className="fw-bold">{row.subject}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`badge ${row.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}

              {/* Message when no records are available */}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-3 text-muted">
                    No records found
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
export default Attendance;

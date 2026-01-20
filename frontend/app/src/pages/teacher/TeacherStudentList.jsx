import React, { useState, useEffect } from "react";
// useState  -> used to store component data (students list, search fields)
// useEffect -> used to run code when component loads (like fetching data)

import Logo from "../../assets/Logo.png";
// Logo image for header

import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> shows toast message container on screen
// toast -> used for showing success/error messages

import "react-toastify/dist/ReactToastify.css";
// react-toastify default CSS

const TeacherStudentList = () => {

  // students -> holds all student records
  // setStudents -> updates students list
  const [students, setStudents] = useState([]);

  // searchType -> defines whether search by "name" or "id"
  const [searchType, setSearchType] = useState("name");

  // searchTerm -> stores what user types in search box
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect runs once when component loads (because dependency array is [])
  useEffect(() => {

    // Dummy data: here we are simulating backend response
    const fetchedData = [
      { id: 101, name: "Aarav Sharma", email: "aarav@gmail.com", mobile: "9876543210", gender: "Male", course: "PG-DAC", admissionDate: "2025-06-15" },
      { id: 102, name: "Diya Patel", email: "diya@gmail.com", mobile: "9876543211", gender: "Female", course: "PG-DBDA", admissionDate: "2025-06-16" },
      { id: 103, name: "Rohan Mehra", email: "rohan@gmail.com", mobile: "9876543212", gender: "Male", course: "PG-DAC", admissionDate: "2025-06-18" },
      { id: 104, name: "Ananya Singh", email: "ananya@gmail.com", mobile: "9876543213", gender: "Female", course: "PG-DMC", admissionDate: "2025-06-19" },
      { id: 105, name: "Vikram Malhotra", email: "vikram@gmail.com", mobile: "9876543214", gender: "Male", course: "PG-DAC", admissionDate: "2025-06-20" },
    ];

    // store fetched data into students state
    setStudents(fetchedData);
  }, []); // [] means run only once at initial render

  // filteredStudents -> this will contain only those students
  // that match search criteria (name or id)
  const filteredStudents = students.filter((student) => {

    // if searchType is id -> filter by roll number
    if (searchType === "id") {
      // convert id to string because searchTerm is string
      return student.id.toString().includes(searchTerm);
    }

    // otherwise filter by student name (case insensitive search)
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // this function will run when user clicks Download CSV button
  const handleDownload = () => {
    // currently only toast is shown (later CSV download logic can be implemented)
    toast.success("Downloading Student List CSV...");
  };

  return (
    <>
      {/* ToastContainer is needed to show toast messages */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page header section */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        
        {/* Institute logo */}
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />

        {/* Heading */}
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          Student List
        </h4>
      </div>

      {/* Main card container */}
      <div className="card card-custom p-4">

        {/* Search section */}
        <div className="d-flex justify-content-end mb-3 gap-2">

          {/* Dropdown to select search type */}
          <select
            className="form-select"
            style={{ width: "180px" }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)} // update search type state
          >
            <option value="name">Search by Name</option>
            <option value="id">Search by Roll No</option>
          </select>

          {/* Search input box */}
          <input
            type="text"
            className="form-control"
            placeholder="Type to search..."
            style={{ maxWidth: "250px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // update searchTerm state
          />
        </div>

        {/* Responsive table */}
        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle">

            {/* Table header */}
            <thead className="table-light">
              <tr>
                <th>Roll No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Join Date</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {filteredStudents.length > 0 ? (
                
                // If any student matches criteria -> show student rows
                filteredStudents.map((s) => (
                  <tr key={s.id}>

                    {/* Roll number */}
                    <td className="fw-bold">{s.id}</td>

                    {/* Student name */}
                    <td className="fw-semibold text-dark">{s.name}</td>

                    {/* Email */}
                    <td>{s.email}</td>

                    {/* Mobile */}
                    <td>{s.mobile}</td>

                    {/* Gender */}
                    <td>{s.gender}</td>

                    {/* Course badge */}
                    <td>
                      <span className="badge bg-light text-dark border">
                        {s.course}
                      </span>
                    </td>

                    {/* Admission date */}
                    <td>{s.admissionDate}</td>
                  </tr>
                ))
              ) : (
                
                // If no students found -> show message
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No students found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Download button section */}
        <div className="text-end mt-4">
          <button
            className="btn text-white btn-sm px-4 py-2"
            style={{ backgroundColor: "#1a237e" }}
            onClick={handleDownload} // trigger download function
          >
            Download CSV
          </button>
        </div>
      </div>
    </>
  );
};

export default TeacherStudentList;
// export component so it can be imported and used in routes/pages
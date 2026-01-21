import React, { useState, useEffect } from "react";
// useState  -> to store students list, marks, course info
// useEffect -> to load data when component loads

import Logo from "../../assets/Logo.png";
// Logo image for header

import { ToastContainer, toast } from "react-toastify";
// ToastContainer -> required to display toast messages
// toast -> used to show success/error popup messages

import "react-toastify/dist/ReactToastify.css";
// toast default css

const TeacherEvaluateStudent = () => {

  // students state holds list of student objects (roll no + name)
  const [students, setStudents] = useState([]);

  // marks state stores marks for each student in key-value format
  const [marks, setMarks] = useState({});

  // courseInfo holds course name and subject name entered by teacher
  const [courseInfo, setCourseInfo] = useState({ course: "", subject: "" });

  // useEffect runs once on first render (component mount)
  useEffect(() => {
    // Dummy student data (in real app this will come from backend API)
    const fetchedStudents = [
      { id: 101, name: "Aarav Sharma" },
      { id: 102, name: "Diya Patel" },
      { id: 103, name: "Rohan Mehra" },
      { id: 104, name: "Ananya Singh" },
      { id: 105, name: "Vikram Malhotra" },
    ];

    // store students list into state
    setStudents(fetchedStudents);
  }, []);
  
  // function updates marks state when teacher enters marks
  const handleMarkChange = (studentId, value) => {
    setMarks((prev) => ({
      ...prev,          // keep previous marks
      [studentId]: value, // update current student mark
    }));
  };

  // function returns Pass/Fail based on marks
  const getStatus = (mark) => {
    // if mark not entered yet -> show "-"
    if (!mark) return "-";

    // pass condition: marks >= 40
    return parseInt(mark) >= 40 ? "Pass" : "Fail";
  };

  // Submit button handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page refresh on submit

    // validation: course & subject required
    if (!courseInfo.course || !courseInfo.subject) {
      toast.error("Please enter Course and Subject details");
      return;
    }

    // Preparing payload for backend
    // It creates array containing marks for each student
    const payload = students.map((student) => ({
      studentId: student.id,
      marks: marks[student.id] || 0, // if no marks entered then 0
      status: getStatus(marks[student.id]), // pass/fail
    }));

    // In real project, payload will be sent using API call
    // axios.post("/submitMarks", payload)

    toast.success("Marks submitted successfully!");
  };

  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header Section */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          Evaluate Student
        </h4>
      </div>

      {/* Main container */}
      <div className="container-fluid p-0">
        <div className="card card-custom p-4">

          {/* Form starts here */}
          <form onSubmit={handleSubmit}>

            {/* Course + Subject input section */}
            <div className="row g-3 mb-4">

              {/* Course name input */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-muted small">Course Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. PG-DAC"
                  value={courseInfo.course}
                  // updating courseInfo.course
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, course: e.target.value })
                  }
                />
              </div>

              {/* Subject name input */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-muted small">Subject Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Core Java"
                  value={courseInfo.subject}
                  // updating courseInfo.subject
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, subject: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Table Title */}
            <h5 className="fw-bold mb-3 text-dark">Enter Marks</h5>
            
            {/* Marks Entry Table */}
            <div className="table-responsive">
              <table className="table table-custom table-bordered align-middle">

                {/* Table Heading */}
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "100px" }} className="text-center">Roll No</th>
                    <th>Student Name</th>
                    <th style={{ width: "200px" }}>Marks (Out of 100)</th>
                    <th style={{ width: "150px" }} className="text-center">Status</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {students.map((student) => {

                    // marks entered for current student
                    const currentMark = marks[student.id] || "";

                    // calculate pass/fail status
                    const status = getStatus(currentMark);
                    
                    return (
                      <tr key={student.id}>

                        {/* Student roll no */}
                        <td className="text-center">{student.id}</td>

                        {/* Student name */}
                        <td className="fw-bold text-dark">{student.name}</td>

                        {/* Input for marks */}
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="form-control text-center"
                            placeholder="0"
                            value={currentMark}
                            // update marks for student
                            onChange={(e) =>
                              handleMarkChange(student.id, e.target.value)
                            }
                          />
                        </td>

                        {/* Pass/Fail badge */}
                        <td className="text-center">
                          <span 
                            className={`badge ${
                              status === "Pass"
                                ? "bg-success"
                                : status === "Fail"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                            style={{ minWidth: "60px" }}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Submit button */}
            <div className="d-flex justify-content-center mt-4">
              <button 
                type="submit" 
                className="btn text-white px-5 py-2 fw-bold shadow-sm"
                style={{ backgroundColor: "#1a237e" }}
              >
                Submit Marks
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherEvaluateStudent;
// exporting component so it can be used in routes/pages

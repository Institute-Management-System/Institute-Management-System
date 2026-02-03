// ===================== Teacher Student List Page =====================

// React hooks for state management and lifecycle methods
import React, { useState, useEffect } from "react";

// Internationalization (i18n) hook for translations
import { useTranslation } from "react-i18next";

// Application logo used in header
import Logo from "../../assets/Logo.png";

// Toast notifications for user feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Backend service to fetch all students
// This service returns the student list from the server
import { getAllStudents } from "../../services/teacherService";

// ===================== COMPONENT =====================

const TeacherStudentList = () => {
  // Translation function
  const { t } = useTranslation();

  /* ===================== STATE ===================== */

  // State to store all students fetched from backend
  const [students, setStudents] = useState([]);

  // State to store search type (by name or by roll number)
  const [searchType, setSearchType] = useState("name");

  // State to store search input value
  const [searchTerm, setSearchTerm] = useState("");

  /* ===================== LOAD STUDENTS ===================== */

  // Fetch student data from backend when component mounts
  useEffect(() => {

    getAllStudents()
      .then((res) => {

        // Map backend response to UI-friendly structure
        const mappedStudents = res.data.map((s) => ({
          id: s.rollNumber,            // Student Roll Number
          name: s.fullName,            // Student Full Name
          email: s.email,              // Email Address
          mobile: s.phone,             // Mobile Number
          gender: s.gender,            // Gender
          course: s.courseName,        // Course Name
          admissionDate: s.admissionDate // Admission Date
        }));

        // Store mapped students in state
        setStudents(mappedStudents);
      })
      .catch((err) => {
        console.error(err);
        // Show error toast if data loading fails
        toast.error(t('failed_load_students'));
      });

  }, []);

  /* ===================== FILTER LOGIC ===================== */

  // Filter students based on search type and search term
  const filteredStudents = students.filter((student) => {

    // Search by roll number
    if (searchType === "id") {
      return student.id.toString().includes(searchTerm);
    }

    // Search by student name
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Placeholder function for future CSV download feature
  const handleDownload = () => {
    toast.success(t('downloading_csv'));
  };

  /* ===================== UI ===================== */
  return (
    <>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Header */}
      <div className="page-header mb-4 d-flex align-items-center gap-3 shadow-sm bg-white p-3 rounded">
        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
        <h4 className="mb-0 fw-bold" style={{ color: "#1a237e" }}>
          {t('student_list')}
        </h4>
      </div>

      {/* Main Card */}
      <div className="card card-custom p-4">

        {/* Search Section */}
        <div className="d-flex justify-content-end mb-3 gap-2">
          {/* Search type dropdown */}
          <select
            className="form-select"
            style={{ width: "180px" }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">{t('search_by_name')}</option>
            <option value="id">{t('search_by_roll_no')}</option>
          </select>

          {/* Search input */}
          <input
            type="text"
            className="form-control"
            placeholder={t('type_to_search')}
            style={{ maxWidth: "250px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Students Table */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-custom table-hover align-middle">
              {/* Table Header */}
              <thead className="table-light">
                <tr>
                  <th>{t('roll_no')}</th>
                  <th>{t('full_name')}</th>
                  <th>{t('email_address')}</th>
                  <th>{t('mobile')}</th>
                  <th>{t('gender')}</th>
                  <th>{t('courses')}</th>
                  <th>{t('join_date')}</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s.id}>
                      <td className="fw-bold">{s.id}</td>
                      <td className="fw-semibold">{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.mobile}</td>
                      <td>{s.gender}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {s.course}
                        </span>
                      </td>
                      <td>{s.admissionDate}</td>
                    </tr>
                  ))
                ) : (
                  // Empty state when no students match the search
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      {t('no_students_found')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

// ===================== EXPORT =====================
export default TeacherStudentList;

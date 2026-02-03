import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "../../services/admin.service";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AdminStudentMarks = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await AdminService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_courses'));
    }
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSelectedSubject("");
    setMarks([]);
    if (courseId) {
      try {
        const subjectResponse = await AdminService.getAllSubjects();
        const filtered = subjectResponse.data.filter(s => s.course && s.course.id.toString() === courseId);
        setSubjects(filtered);
      } catch (error) {
        toast.error(t('failed_fetch_subjects'));
      }
    } else {
      setSubjects([]);
    }
  };

  const handleSearch = async () => {
    if (!selectedCourse || !selectedSubject) {
      toast.warning(t('select_course_subject_warning'));
      return;
    }
    try {
      const response = await AdminService.getMarksByCourseAndSubject(selectedCourse, selectedSubject);
      setMarks(response.data);
    } catch (error) {
      toast.error(t('error_fetching_marks'));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{t('student_marks')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-4">
        {/* Search Section */}
        <div className="card p-4 mb-4 shadow-sm border-0">
          <div className="row g-3">
            <div className="col-md-5">
              <select className="form-select" value={selectedCourse} onChange={handleCourseChange}>
                <option value="">{t('select_course_label')}</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-5">
              <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedCourse}>
                <option value="">{t('select_subject')}</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleSearch}>{t('search_action')}</button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0 text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3">{t('roll_no')}</th>
                  <th className="py-3">{t('header_student_info')}</th>
                  <th className="py-3">{t('obtained_marks')}</th>
                  <th className="py-3">{t('total_marks')}</th>
                  <th className="py-3">{t('exam_date')}</th>
                  <th className="py-3">{t('status')}</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{mark.rollNumber}</td>
                    <td>{mark.studentName}</td>
                    <td>{mark.obtainedMarks}</td>
                    <td>{mark.totalMarks}</td>
                    <td>{mark.examDate}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 ${mark.status === 'PASS' ? 'bg-success' : 'bg-danger'}`}>
                        {mark.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {marks.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">{t('no_marks_found')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminStudentMarks;
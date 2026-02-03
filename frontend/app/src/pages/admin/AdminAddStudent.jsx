import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";

const AdminAddStudent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const [isEditMode, setIsEditMode] = useState(false);

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    joiningDate: "",
    address: "",
    course: "",
    qualification: "",
    gender: "",
    status: true,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    if (id) {
      setIsEditMode(true);
      fetchStudent(id);
    }
  }, [id]);

  const fetchCourses = async () => {
    try {
      const response = await AdminService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_courses') || "Failed to fetch courses"); // Fallback or add key if missing
    }
  };

  const fetchStudent = async (studentId) => {
    try {
      const response = await AdminService.getStudentById(studentId);
      const data = response.data;
      // Map data to state
      setStudent({
        firstName: data.fullName ? data.fullName.split(" ")[0] : "",
        lastName: data.fullName ? data.fullName.split(" ").slice(1).join(" ") : "",
        phone: data.phone || "",
        email: data.email || "",
        dob: data.dob || "",
        joiningDate: data.admissionDate || "", // Mapping admissionDate to joiningDate
        address: data.address || "",
        course: "PG-DAC",
        qualification: data.qualification || "", // Added qualification
        gender: data.gender ? (data.gender.charAt(0) + data.gender.slice(1).toLowerCase()) : "",
        status: data.status
      });
    } catch (error) {
      toast.error(t('failed_fetch_student_details') || "Failed to fetch student details");
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        dob: student.dob,
        joiningDate: student.joiningDate,
        address: student.address,
        courseName: student.course,
        qualification: student.qualification,
        gender: student.gender,
        status: student.status
      };

      if (isEditMode) {
        await AdminService.updateStudent(id, studentData);
        toast.success(t('student_updated_success'));
        setTimeout(() => navigate("/admin/students/list"), 1500);
      } else {
        await AdminService.addStudent(studentData);
        toast.success(t('student_added_success'));
        setStudent({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          dob: "",
          joiningDate: "",
          address: "",
          course: "",
          gender: "",
          status: true,
          qualification: ""
        });
      }
    } catch (error) {
      console.error("Save Student Error", error);
      toast.error(`${t('failed_save_student') || "Failed to save student"}. ` + (error.response?.data?.message || ""));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{isEditMode ? t('edit_student') : t('add_student')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "900px", backgroundColor: "#f8f9fa" }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">{t('first_name')}</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={student.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('last_name')}</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={student.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('phone_number')}</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={student.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('email_address')}</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={student.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('date_of_birth')}</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={student.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('joining_date')}</label>
                <input
                  type="date"
                  name="joiningDate"
                  className="form-control"
                  value={student.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('address')}</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={student.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('select_course_label')}</label>
                <select
                  name="course"
                  className="form-select"
                  value={student.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('select_course')}</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('gender')}</label>
                <select
                  name="gender"
                  className="form-select"
                  value={student.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('select_gender')}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold d-block">{t('status')}</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="status"
                    checked={student.status}
                    onChange={(e) =>
                      setStudent({ ...student, status: e.target.checked })
                    }
                  />
                  <label className="form-check-label">
                    {student.status ? t('active') : t('inactive')}
                  </label>
                </div>
              </div>

              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold">
                  {isEditMode ? t('update_student') : t('add_student')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminAddStudent;
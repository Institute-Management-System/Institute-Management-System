import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";

const AdminAddTeacher = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    joiningDate: "",
    address: "",
    qualification: "",
    gender: "",
    status: true,
    courseId: "", // Store ID locally for logic
    subjectId: ""
  });

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchCourses();
    if (id) {
      setIsEditMode(true);
      fetchTeacher(id);
    }
  }, [id]);

  useEffect(() => {
    if (teacher.courseId) {
      fetchSubjects(teacher.courseId);
    } else {
      setSubjects([]);
    }
  }, [teacher.courseId]);


  const fetchCourses = async () => {
    try {
      const response = await AdminService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses");
    }
  };

  const fetchSubjects = async (courseId) => {
    // Assuming you have an API to get subjects by course or filter client side
    // For now, let's fetch all and filter or use specific endpoint if available
    try {
      // Best to have getAllSubjects or getSubjectsByCourse
      const response = await AdminService.getAllSubjects();
      // Filter by courseId if the backend getAllSubjects doesn't filtering
      // But looking at previous files, you might want to consider adding a specific endpoint if many subjects
      // For now let's filter purely client side based on what we get
      // Actually AdminService has `getSubjectsByCourse`? Let's check or assume generic fetch
      const allSubjects = response.data;
      const filtered = allSubjects.filter(s =>
        (s.course && s.course.id == courseId) ||
        (s.courseId == courseId)
      );
      setSubjects(filtered);
    } catch (error) {
      console.error("Failed to fetch subjects");
    }
  };


  const fetchTeacher = async (teacherId) => {
    try {
      const response = await AdminService.getTeacherById(teacherId);
      const data = response.data;
      setTeacher({
        firstName: data.fullName ? data.fullName.split(" ")[0] : "",
        lastName: data.fullName ? data.fullName.split(" ").slice(1).join(" ") : "",
        phone: data.phone || "",
        email: data.email || "",
        dob: data.dob || "",
        joiningDate: data.admissionDate || "",
        address: data.address || "",
        qualification: data.qualification || "",
        gender: data.gender ? (data.gender.charAt(0) + data.gender.slice(1).toLowerCase()) : "",
        status: data.status,
        courseId: "", // Logic to populate this if editing would require fetching assignments which might be complex here
        subjectId: ""
      });
    } catch (error) {
      toast.error("Failed to fetch teacher details");
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setTeacher({ ...teacher, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacherData = {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phone: teacher.phone,
        dob: teacher.dob,
        joiningDate: teacher.joiningDate,
        address: teacher.address,
        qualification: teacher.qualification,
        gender: teacher.gender,
        status: teacher.status,
        subjectId: teacher.subjectId // Pass subject ID
      };

      if (isEditMode) {
        await AdminService.updateTeacher(id, teacherData);
        toast.success(t('teacher_updated_success'));
        setTimeout(() => navigate("/admin/teachers/list"), 1500);
      } else {
        await AdminService.addTeacher(teacherData);
        toast.success(t('teacher_added_success'));
        setTeacher({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          dob: "",
          joiningDate: "",
          address: "",
          gender: "",
          status: true,
          courseId: "",
          subjectId: ""
        });
      }
    } catch (error) {
      console.error("Save Teacher Error", error);
      toast.error(`${t('failed_save_teacher')}. ` + (error.response?.data?.message || ""));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="45" className="me-3" />
          <h3 className="mb-0 fw-bold">{isEditMode ? t('edit_teacher') : t('add_teacher')}</h3>
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
                  value={teacher.firstName}
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
                  value={teacher.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('mobile')}</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={teacher.phone}
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
                  value={teacher.email}
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
                  value={teacher.dob}
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
                  value={teacher.joiningDate}
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
                  value={teacher.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('qualification')}</label>
                <input
                  type="text"
                  name="qualification"
                  className="form-control"
                  value={teacher.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('assign_course')}</label>
                <select
                  name="courseId"
                  className="form-select"
                  value={teacher.courseId}
                  onChange={handleChange}
                >
                  <option value="">{t('select_course')}</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('assign_subject')}</label>
                <select
                  name="subjectId"
                  className="form-select"
                  value={teacher.subjectId}
                  onChange={handleChange}
                  disabled={!teacher.courseId}
                >
                  <option value="">{t('select_subject')}</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('gender')}</label>
                <select
                  name="gender"
                  className="form-select"
                  value={teacher.gender}
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
                    checked={teacher.status}
                    onChange={(e) => setTeacher({ ...teacher, status: e.target.checked })}
                  />
                  <label className="form-check-label">
                    {teacher.status ? t('active') : t('inactive')}
                  </label>
                </div>
              </div>

              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold">
                  {isEditMode ? t('update_teacher') : t('add_teacher')}
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
export default AdminAddTeacher;
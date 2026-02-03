import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";
import { useEffect } from "react";

const AdminManageSubjects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();


  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    courseId: "",
    teacherId: "" // Added teacherId
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]); // Added teachers state
  const [scheduleFile, setScheduleFile] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchTeachers(); // Fetch teachers on mount
    if (id) {
      fetchSubjectData();
    }
  }, [id]);

  const fetchSubjectData = async () => {
    try {
      const response = await AdminService.getSubjectById(id);
      const data = response.data;
      setForm({
        name: data.name,
        code: data.code || "", // Ensure code is handled
        description: data.description || "",
        courseId: data.course?.id || data.courseId, // Handle nested object or direct ID
        teacherId: data.teacher?.id || data.teacherId || "" // Handle nested object or direct ID
      });
    } catch (error) {
      toast.error(t('failed_fetch_subject_details'));
      navigate("/admin/subjects");
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await AdminService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_courses'));
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await AdminService.getAllTeachers();
      setTeachers(response.data);
    } catch (error) {
      toast.error(t('failed_fetch_teachers'));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.courseId) {
      toast.error(t('please_fill_required'));
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "subject",
        new Blob(
          [
            JSON.stringify({
              name: form.name,
              code: form.code,
              courseId: form.courseId,
              description: form.description,
              teacherId: form.teacherId,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (scheduleFile) {
        formData.append("schedule", scheduleFile);
      }

      if (id) {
        // Use FormData for Update as well
        await AdminService.updateSubject(id, formData);
        toast.success(t('subject_updated_success'));
      } else {
        await AdminService.addSubject(formData);
        toast.success(t('subject_added_success'));
      }
      navigate("/admin/subjects");
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || (id ? t('failed_update_subject') : t('failed_add_subject'));
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{t('manage_subjects')}</h3>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/admin/subjects")}
          >
            {t('view_list')}
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            {t('back')}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "700px", backgroundColor: "#f8f9fa" }}>
          <h4 className="fw-bold text-center mb-4">{id ? t('edit_subject') : t('add_new_subject')}</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">{t('select_course_label')}</label>
              <select
                name="courseId"
                className="form-select"
                value={form.courseId}
                onChange={handleChange}
                required
              >
                <option value="">{t('select_course')}</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Teacher Selection */}
            <div className="mb-3">
              <label className="form-label fw-bold">{t('assign_teacher_optional')}</label>
              <select
                name="teacherId"
                className="form-select"
                value={form.teacherId}
                onChange={handleChange}
              >
                <option value="">{t('select_teacher')}</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.fullName} ({t.email})</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">{t('subject_name')}</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={t('enter_subject_name')}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">{t('subject_code')}</label>
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder={t('enter_subject_code')}
                value={form.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">{t('description')}</label>
              <textarea
                name="description"
                className="form-control"
                placeholder={t('subject_description')}
                rows={4}
                value={form.description}
                onChange={handleChange}
                style={{ resize: "none" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">{t('upload_schedule')}</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setScheduleFile(e.target.files[0])}
                accept=".pdf"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 fw-bold rounded-pill"
              >
                {id ? t('update_subject') : t('add_subject')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminManageSubjects;
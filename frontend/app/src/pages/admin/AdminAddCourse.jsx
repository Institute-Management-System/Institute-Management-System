import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminService from "../../services/admin.service";

const AdminAddCourse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [course, setCourse] = useState({
    name: "",
    description: "",
    duration: "",
    maxStudents: "",
    startDate: "",
    endDate: "",
    fees: "",
  });

  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchCourse(id);
    }
  }, [id]);

  const fetchCourse = async (courseId) => {
    try {
      const response = await AdminService.getCourseById(courseId);
      const data = response.data;
      setCourse({
        name: data.name || "",
        description: data.description || "",
        duration: data.duration || "",
        maxStudents: data.maxStudents || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        fees: data.fees || "",
      });
    } catch (error) {
      toast.error(t('failed_fetch_course_details') || "Failed to fetch course details");
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTimetable(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course.name || !course.duration || !course.fees || !course.startDate) {
      toast.error(t('please_fill_required'));
      return;
    }

    try {
      const courseData = {
        name: course.name,
        description: course.description,
        duration: course.duration,
        maxStudents: course.maxStudents,
        startDate: course.startDate,
        endDate: course.endDate,
        fees: course.fees
      };

      if (isEditMode) {
        await AdminService.updateCourse(id, courseData);
        toast.success(t('course_updated_success'));
        setTimeout(() => navigate("/admin/courses"), 1500);
      } else {
        await AdminService.addCourse(courseData);
        toast.success(t('course_added_success'));

        // Clear form
        setCourse({
          name: "",
          description: "",
          duration: "",
          maxStudents: "",
          startDate: "",
          endDate: "",
          fees: "",
        });
        setTimetable(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${isEditMode ? "update" : "add"} course. ` + (error.response?.data?.message || ""));
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="d-flex align-items-center justify-content-between p-3 bg-white border-bottom shadow-sm">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width={45} className="me-3" />
          <h3 className="mb-0 fw-bold">{isEditMode ? t('manage_course') : t('manage_courses')}</h3>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          {t('back')}
        </button>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "900px", backgroundColor: "#f8f9fa" }}>
          <h4 className="text-center fw-bold mb-4">{isEditMode ? t('edit_course') : t('new_course')}</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">{t('courses')}</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="e.g. PG-DAC"
                  value={course.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('duration_months')}</label>
                <input
                  type="number"
                  name="duration"
                  className="form-control"
                  placeholder="e.g. 6"
                  value={course.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">{t('description')}</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder={t('enter_course_details')}
                  value={course.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('start_date')}</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={course.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('end_date')}</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={course.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('max_intake')}</label>
                <input
                  type="number"
                  name="maxStudents"
                  className="form-control"
                  placeholder="e.g. 60"
                  value={course.maxStudents}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">{t('course_fees_currency')}</label>
                <input
                  type="number"
                  name="fees"
                  className="form-control"
                  placeholder="e.g. 90000"
                  value={course.fees}
                  onChange={handleChange}
                  required
                />
              </div>



              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 rounded-pill fw-bold"
                >
                  {isEditMode ? t('update_course') : t('add_course')}
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

export default AdminAddCourse;
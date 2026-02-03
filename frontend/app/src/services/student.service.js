import api from "../api";

const BASE_URL = "http://localhost:8080";
/* ================= ATTENDANCE ================= */

/**
 * OVERALL ATTENDANCE
 * Backend extracts userId from JWT
 * Request DTO: { courseId }
 */
export const fetchOverallAttendance = async ({ courseId }) => {
    const res = await api.post("/student/attendance/overall", { courseId });
    return res?.data?.data ?? null;
};

/**
 * MONTHLY ATTENDANCE
 * Request DTO: { courseId, month }  // yyyy-MM
 */
export const fetchMonthlyAttendance = async ({ courseId, month }) => {
    const res = await api.post("/student/attendance/monthly", {
        courseId,
        month,
    });
    return res?.data?.data ?? null;
};

/**
 * ATTENDANCE TABLE
 * Request DTO: { courseId, startDate, endDate }
 */
export const fetchAttendanceTable = async ({
    courseId,
    startDate,
    endDate,
}) => {
    const res = await api.post("/student/attendance/table", {
        courseId,
        startDate,
        endDate,
    });
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/* ================= SUBJECTS ================= */

/**
 * SUBJECT TIMETABLE
 */
export const fetchStudentSubjectTimetable = async () => {
    const res = await api.get("/student/subjects/timetable");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/**
 * SUBJECTS BY COURSE
 */
export const fetchSubjectsByCourse = async (courseId) => {
    const res = await api.get(`/student/subjects/by-course/${courseId}`);
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};
/* ================= COURSES ================= */

/**
 * TOTAL COURSES COUNT
 */
export const fetchTotalCourses = async () => {
    const res = await api.get("/student/courses/count");
    return res?.data?.data ?? 0;
};

/**
 * FETCH STUDENT COURSES
 */
export const fetchStudentCourses = async () => {
    const res = await api.get("/student/courses");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/**
 * TOTAL SUBJECTS COUNT
 */
export const fetchTotalSubjects = async () => {
    const res = await api.get("/student/subjects/count");
    return res?.data?.data ?? 0;
};

/**
 * ENROLLED SUBJECTS
 */
export const fetchEnrolledSubjects = async () => {
    const res = await api.get("/student/subjects/enrolled");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/* ================= MARKS ================= */

/**
 * STUDENT MARKS
 */
export const fetchStudentMarks = async () => {
    const res = await api.get("/student/marks");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/* ================= FEES ================= */

/**
 * STUDENT FEES
 * Backend extracts userId from JWT
 */
export const fetchStudentFees = async () => {
    const res = await api.get("/student/fees");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/* ================= NOTICES ================= */

/**
 * FETCH ALL STUDENT NOTICES
 */
export const fetchStudentNotices = async () => {
    const res = await api.get("/student/notices");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/**
 * FETCH TOP 5 NOTICES
 */
export const fetchTopNotices = async () => {
    const res = await api.get("/student/notices/top");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

/* ================= PROFILE ================= */

/**
 * GET STUDENT PROFILE
 * Backend extracts userId from JWT
 */
export const fetchStudentProfile = async () => {
    const res = await api.get("/student/profile");
    return res?.data?.data ?? null;
};

/**
 * UPDATE STUDENT PROFILE
 * Editable fields: fullName, phone, profileImage (optional later)
 */
export const updateStudentProfile = async (formData) => {
  const res = await api.put("/student/update", formData);
  return res.data.data;
};


/* ================= FEEDBACK ================= */

/**
 * SUBMIT STUDENT FEEDBACK
 * Payload: { feedbackText, rating, courseId, subjectId }
 */
export const submitFeedback = async (payload) => {
    const res = await api.post("/student/feedback", payload);
    return res?.data ?? null;
};

// ================= STUDENT FEEDBACK LIST =================
export const fetchStudentFeedbacks = async () => {
  const res = await api.get("/student/feedback");
  return res.data.data || [];
};

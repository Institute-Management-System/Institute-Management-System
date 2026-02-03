import API from "../api";

const BASE_URL = "/teacher";

/* ================= DASHBOARD ================= */

// GET /teacher
export const getStudentCount = () => {
  return API.get(`${BASE_URL}`);
};

// GET /teacher/student-count/{teacherId}
export const getStudentCountForTeacher = (teacherId) => {
  return API.get(`${BASE_URL}/student-count/${teacherId}`);
};

// GET /teacher/subject-count/{teacherId}
export const getAssignedSubjectCount = (teacherId) => {
  return API.get(`${BASE_URL}/subject-count/${teacherId}`);
};

// GET /teacher/average-attendance
export const getAverageAttendance = () => {
  return API.get(`${BASE_URL}/average-attendance`);
};

/* ================= STUDENTS ================= */

// GET /teacher/allstudents
export const getAllStudents = () => {
  return API.get(`${BASE_URL}/allstudents`);
};

// GET /teacher/attendance
export const getStudentAttendance = () => {
  return API.get(`${BASE_URL}/attendance`);
};

/* ================= SUBJECTS ================= */

// GET /teacher/subjects/teacher/{teacherId}
export const getTeacherSubjects = (teacherId) => {
  return API.get(`${BASE_URL}/subjects/teacher/${teacherId}`);
};

/* ================= MARKS ================= */

// GET /teacher/students-for-marks/by-name
export const getStudentsForMarksByName = (courseName, subjectName) => {
  return API.get(`${BASE_URL}/students-for-marks/by-name`, {
    params: { courseName, subjectName },
  });
};

// POST /teacher/submit-marks
export const submitMarks = (payload) => {
  return API.post(`${BASE_URL}/submit-marks`, payload);
};

/* ================= PROFILE ================= */

// GET /teacher/profile/{teacherId}
export const fetchTeacherProfile = (teacherId) => {
  return API.get(`${BASE_URL}/profile/${teacherId}`);
};

// PUT /teacher/update/{teacherId}
export const updateTeacherProfile = (teacherId, payload) => {
  return API.put(`${BASE_URL}/update/${teacherId}`, payload);
};

/* ================= NOTICES ================= */

// GET /teacher/notices
export const getTeacherNotices = () => {
  return API.get(`${BASE_URL}/notices`);
};

// GET /teacher/notices/top
export const getTopTeacherNotices = () => {
  return API.get(`${BASE_URL}/notices/top`);
};

/* ================= SCHEDULE ================= */

// GET /teacher/schedule/{teacherId}
export const getTeacherSchedule = (teacherId) => {
  return API.get(`${BASE_URL}/schedule/${teacherId}`);
};

/* ================= EXAMS ================= */

// POST /teacher/exams/create
export const createExam = (payload) => {
  return API.post(`${BASE_URL}/exams/create`, payload);
};

// GET /teacher/exams/{teacherId}
export const getTeacherExams = (teacherId) => {
  return API.get(`${BASE_URL}/exams/${teacherId}`);
};

// GET /teacher/exams/{examId}/results
export const getExamResults = (examId) => {
  return API.get(`${BASE_URL}/exams/${examId}/results`);
};

// GET /api/teacher/my-attendance/{teacherId}
export const getTeacherMyAttendance = (teacherId) => {
  return API.get(`/teacher/my-attendance/${teacherId}`);
};


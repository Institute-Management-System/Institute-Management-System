import API from "../api";

const BASE_URL = "/teacher";

// 👉 Get total active students count
export const getStudentCount = () => {
    return API.get(`${BASE_URL}`);
};

export const getStudentCountForTeacher = (teacherId) => {
    return API.get(`${BASE_URL}/student-count/${teacherId}`);
};

/////
export const getAverageAttendance = () => {
    return API.get(`${BASE_URL}/average-attendance`);
};




// GET /teacher/allstudents
export const getAllStudents = () => {
    return API.get(`${BASE_URL}/allstudents`);
};

// ================= Evaluate Student =================
export const getStudentsForMarksByName = (courseName, subjectName) => {
    return API.get(`${BASE_URL}/students-for-marks/by-name`, {
        params: { courseName, subjectName },
    });
};

export const submitMarks = (payload) =>
    API.post(`${BASE_URL}/submit-marks`, payload);


// ================================================

// 🔹 Get student attendance list
export const getStudentAttendance = () => {
    return API.get(`${BASE_URL}/attendance`);
};

// Subjects (FIXED)
export const getTeacherSubjects = (teacherId) =>
    API.get(`${BASE_URL}/subjects/teacher/${teacherId}`);


/* ================= PROFILE ================= */
export const fetchTeacherProfile = (teacherId) =>
    API.get(`${BASE_URL}/profile/${teacherId}`);

export const updateTeacherProfile = (teacherId, payload) =>
    API.put(`${BASE_URL}/update/${teacherId}`, payload);

/* ================= TEACHER NOTICES ================= */

export const getTeacherNotices = () => {
    return API.get(`${BASE_URL}/notices`);
};

/**
 * 🔹 Get TOP / RECENT notices for teacher (Dashboard)
 * API: GET /teacher/notices/top
 * Response: { data: [...], status: "SUCCESS" }
 */
export const getTopTeacherNotices = () => {
    return API.get(`${BASE_URL}/notices/top`);
};
// ================= TEACHER SCHEDULE =================
export const getTeacherSchedule = (teacherId) => {
    return API.get(`${BASE_URL}/schedule/${teacherId}`);
};

export const getAssignedSubjectCount = (teacherId) => {
    return API.get(`${BASE_URL}/subject-count/${teacherId}`);
};


// GET /api/teacher/my-attendance/{teacherId}
export const getTeacherMyAttendance = (teacherId) => {
  return API.get(`/teacher/my-attendance/${teacherId}`);
};
import API from "../api";

const getAuthHeader = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
};

const AdminService = {
    // --- Students ---
    getAllStudents: async () => {
        return await API.get("/admin/students");
    },
    getStudentById: async (id) => {
        return await API.get(`/admin/students/${id}`);
    },
    addStudent: async (studentData) => {
        return await API.post("/admin/students", studentData);
    },
    updateStudent: async (id, studentData) => {
        return await API.put(`/admin/students/${id}`, studentData);
    },
    deleteStudent: async (id) => {
        return await API.delete(`/admin/students/${id}`);
    },

    // --- Teachers ---
    getAllTeachers: async () => {
        return await API.get("/admin/teachers");
    },
    getTeacherById: async (id) => {
        return await API.get(`/admin/teachers/${id}`);
    },
    addTeacher: async (teacherData) => {
        return await API.post("/admin/teachers", teacherData);
    },
    updateTeacher: async (id, teacherData) => {
        return await API.put(`/admin/teachers/${id}`, teacherData);
    },
    deleteTeacher: async (id) => {
        return await API.delete(`/admin/teachers/${id}`);
    },

    // --- Courses ---
    getAllCourses: async () => {
        return await API.get("/admin/courses");
    },
    getCourseById: async (id) => {
        return await API.get(`/admin/courses/${id}`);
    },
    addCourse: async (courseData) => {
        return await API.post("/admin/courses", courseData);
    },
    updateCourse: async (id, courseData) => {
        return await API.put(`/admin/courses/${id}`, courseData);
    },
    deleteCourse: async (id) => {
        return await API.delete(`/admin/courses/${id}`);
    },

    // --- Subjects ---
    getAllSubjects: async () => {
        return await API.get("/admin/subjects");
    },
    getSubjectById: async (id) => {
        return await API.get(`/admin/subjects/${id}`);
    },
    addSubject: async (subjectData) => {
        return await API.post("/admin/subjects", subjectData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    updateSubject: async (id, subjectData) => {
        // Check if subjectData is FormData (for file upload) or JSON
        if (subjectData instanceof FormData) {
            return await API.put(`/admin/subjects/${id}`, subjectData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
        }
        return await API.put(`/admin/subjects/${id}`, subjectData);
    },
    deleteSubject: async (id) => {
        return await API.delete(`/admin/subjects/${id}`);
    },

    // --- Notices ---
    getAllNotices: async () => {
        return await API.get("/admin/notices");
    },
    addNotice: async (noticeData) => {
        return await API.post("/admin/notices", noticeData);
    },
    deleteNotice: async (id) => {
        return await API.delete(`/admin/notices/${id}`);
    },

    // --- Fee Management ---
    getAllStudentFees: async () => {
        return await API.get("/admin/fees");
    },
    updateFeeStatus: async (id, status) => {
        return await API.put(`/admin/fees/${id}/status`, status, {
            headers: { "Content-Type": "application/json" }
        });
    },

    // --- Student Marks ---
    getMarksByCourseAndSubject: async (courseId, subjectId) => {
        return await API.get(`/admin/marks/search?courseId=${courseId}&subjectId=${subjectId}`);
    },

    // --- Feedback Management ---
    getAllFeedbacks: async () => {
        return await API.get("/admin/feedbacks");
    },
    respondToFeedback: async (id, response) => {
        return await API.put(`/admin/feedbacks/${id}/respond`, response, {
            headers: { "Content-Type": "application/json" }
        });
    },

    // --- Attendance Reports ---
    getStudentAttendanceList: async () => {
        return await API.get("/admin/attendance/students");
    },
    getTeacherAttendanceList: async () => {
        return await API.get("/admin/attendance/teachers");
    },

    // --- User Status Management ---
    toggleUserStatus: async (id) => {
        return await API.put(`/admin/users/${id}/status`);
    },
    toggleCourseStatus: async (id) => {
        return await API.put(`/admin/courses/${id}/status`);
    },
    toggleSubjectStatus: async (id) => {
        return await API.put(`/admin/subjects/${id}/status`);
    },

    // --- Bulk Upload ---
    uploadUsers: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return await API.post("/admin/users/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
};

export default AdminService;

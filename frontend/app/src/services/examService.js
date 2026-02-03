import API from "../api";

const BASE_URL = "/teacher/exams";

// --- EXAM RELATED API CALLS ---

export const createExam = async (examData) => {
    return await API.post(`${BASE_URL}/create`, examData);
};

export const getExamsForTeacher = async (teacherId) => {
    return await API.get(`${BASE_URL}/${teacherId}`);
};

export const getExamsForStudent = async () => {
    return await API.get(`/student/exams`);
};

export const getExamResults = async (examId) => {
    return await API.get(`${BASE_URL}/${examId}/results`);
};

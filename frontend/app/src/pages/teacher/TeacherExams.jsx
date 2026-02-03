import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaGoogle, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTeacherSubjects } from "../../services/teacherService";
import { createExam, getExamsForTeacher, getExamResults } from "../../services/examService";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  font-weight: 700;
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ExamCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Badge = styled.span`
  background-color: ${props => props.bg || "#e9ecef"};
  color: ${props => props.color || "#495057"};
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;
  &:hover {
    background: #f8f9fa;
    border-color: #ced4da;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
`;

const TeacherExams = () => {
    const { t } = useTranslation();
    const [exams, setExams] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [examResults, setExamResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultsLoading, setResultsLoading] = useState(false);

    const [formData, setFormData] = useState({
        examName: "",
        subjectId: "",
        examDate: "",
        totalMarks: "",
        examLink: "",
    });

    const teacherId = JSON.parse(sessionStorage.getItem("user"))?.id;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [subjectsRes, examsRes] = await Promise.all([
                getTeacherSubjects(teacherId),
                getExamsForTeacher(teacherId),
            ]);
            console.log("Teacher Subjects Response:", subjectsRes.data);
            setSubjects(subjectsRes.data);
            setExams(examsRes.data);
        } catch (error) {
            console.error("Error loading data", error);
        }
    };

    const handleCreateGoogleForm = () => {
        window.open("https://docs.google.com/forms/u/0/create", "_blank");
    };

    const handleViewResults = async (exam) => {
        setSelectedExam(exam);
        setIsResultsModalOpen(true);
        setResultsLoading(true);
        try {
            const res = await getExamResults(exam.id);
            setExamResults(res.data);
        } catch (error) {
            console.error("Error fetching results", error);
            toast.error("Failed to fetch exam results");
        } finally {
            setResultsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.examName || !formData.subjectId || !formData.examDate || !formData.examLink) {
            toast.warning(t('please_fill_all_fields'));
            return;
        }

        try {
            setLoading(true);
            const selectedSubject = subjects.find(s => s.subjectId === parseInt(formData.subjectId));

            if (!selectedSubject) {
                toast.error(t('invalid_subject'));
                return;
            }
            if (!selectedSubject.courseId) {
                toast.error(t('course_id_missing'));
                return;
            }

            const payload = {
                ...formData,
                courseId: selectedSubject.courseId,
                subjectId: parseInt(formData.subjectId),
                totalMarks: parseInt(formData.totalMarks),
            };

            await createExam(payload);
            toast.success(t('exam_created_success'));
            setIsModalOpen(false);
            setFormData({
                examName: "",
                subjectId: "",
                examDate: "",
                totalMarks: "",
                examLink: "",
            });
            loadData();
        } catch (error) {
            console.error("Create Exam Error:", error);
            toast.error(error.response?.data?.message || t('failed_create_exam'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Header>
                <Title>{t('manage_exams')}</Title>
                <CreateButton onClick={() => setIsModalOpen(true)}>
                    <FaPlus /> {t('create_new_exam')}
                </CreateButton>
            </Header>

            {/* EXAM LIST */}
            <CardGrid>
                {exams.length > 0 ? (
                    exams.map((exam) => (
                        <ExamCard key={exam.id}>
                            <div style={{ marginBottom: '1rem' }}>
                                <Badge bg="#e3f2fd" color="#0d47a1">{exam.courseName}</Badge>
                                <Badge bg="#f3e5f5" color="#4a148c">{exam.subjectName}</Badge>
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{exam.examName}</h4>
                            <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {t('exam_date')}: {new Date(exam.examDate).toLocaleDateString()} <br />
                                {t('total_marks')}: {exam.totalMarks}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <ActionButton as="a" href={exam.examLink} target="_blank" rel="noopener noreferrer">
                                    <FaExternalLinkAlt /> {t('view_form')}
                                </ActionButton>
                                <ActionButton onClick={() => handleViewResults(exam)}>
                                    <FaEye /> {t('view_results')}
                                </ActionButton>
                            </div>
                        </ExamCard>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6c757d', padding: '2rem' }}>
                        {t('no_exams_created')}
                    </div>
                )}
            </CardGrid>

            {/* CREATE EXAM MODAL */}
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>{t('create_new_exam')}</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>

                        <div className="alert alert-info d-flex align-items-center gap-2 mb-3" style={{ background: '#e3f2fd', color: '#0d47a1', padding: '1rem', borderRadius: '8px' }}>
                            <FaGoogle />
                            <small>
                                <a href="#" onClick={handleCreateGoogleForm} style={{ fontWeight: 'bold' }}>{t('create_exam_step1')}</a>
                                <br />
                                {t('create_exam_step2')}
                            </small>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>{t('exam_title')}</Label>
                                <Input
                                    type="text"
                                    value={formData.examName}
                                    onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('subject')}</Label>
                                <Select
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                    required
                                >
                                    <option value="">{t('select_subject')}</option>
                                    {subjects.map((sub) => (
                                        <option key={sub.id} value={sub.subjectId}>
                                            {sub.subjectName} ({sub.courseName})
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <FormGroup>
                                    <Label>{t('exam_date')}</Label>
                                    <Input
                                        type="date"
                                        value={formData.examDate}
                                        onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>{t('total_marks')}</Label>
                                    <Input
                                        type="number"
                                        value={formData.totalMarks}
                                        onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <FormGroup>
                                <Label>{t('google_form_link')}</Label>
                                <Input
                                    type="url"
                                    placeholder="https://docs.google.com/forms/..."
                                    value={formData.examLink}
                                    onChange={(e) => setFormData({ ...formData, examLink: e.target.value })}
                                    required
                                />
                            </FormGroup>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'white', border: '1px solid #dee2e6', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>{t('cancel')}</button>
                                <button type="submit" disabled={loading} style={{ background: '#667eea', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
                                    {loading ? t('saving') : t('save_exam')}
                                </button>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* RESULTS MODAL */}
            {isResultsModalOpen && (
                <ModalOverlay onClick={() => setIsResultsModalOpen(false)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>{t('exam_results')}: {selectedExam?.examName}</h3>
                            <button onClick={() => setIsResultsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>

                        {resultsLoading ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>{t('loading')}...</div>
                        ) : (
                            <table className="table table-hover" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>{t('roll_no')}</th>
                                        <th>{t('student_name')}</th>
                                        <th>{t('status')}</th>
                                        <th>{t('marks')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examResults.length > 0 ? (
                                        examResults.map((result) => (
                                            <tr key={result.studentId}>
                                                <td>{result.rollNumber || "N/A"}</td>
                                                <td>{result.studentName}</td>
                                                <td>
                                                    <Badge bg={result.status === "Present" ? "#d4edda" : "#e2e3e5"} color={result.status === "Present" ? "#155724" : "#383d41"}>
                                                        {result.status}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {result.obtainedMarks !== null ? (
                                                        <strong>{result.obtainedMarks} / {selectedExam.totalMarks}</strong>
                                                    ) : "-"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#6c757d' }}>
                                                {t('no_students_enrolled')}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button type="button" onClick={() => setIsResultsModalOpen(false)} style={{ background: 'white', border: '1px solid #dee2e6', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>{t('close')}</button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default TeacherExams;

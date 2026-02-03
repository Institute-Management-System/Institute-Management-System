// ===================== Teacher Exam Page =====================

// React hooks for state management and lifecycle methods
import React, { useState, useEffect } from "react";

// Internationalization (i18n) hook
import { useTranslation } from "react-i18next";

// Icons used in exam management UI
import { FaPlus, FaGoogle, FaExternalLinkAlt, FaEye } from "react-icons/fa";

// Toast notifications for feedback
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Backend services
import { getTeacherSubjects } from "../../services/teacherService";
import { createExam, getExamsForTeacher, getExamResults } from "../../services/examService";

// Styled-components for UI styling
import styled from "styled-components";

// ===================== STYLED COMPONENTS =====================

// Main page container
const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

// Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

// Page title
const Title = styled.h2`
  color: #2c3e50;
  font-weight: 700;
`;

// Button to create a new exam
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

// Grid for displaying exam cards
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

// Individual exam card
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

// Badge for course, subject, and status
const Badge = styled.span`
  background-color: ${props => props.bg || "#e9ecef"};
  color: ${props => props.color || "#495057"};
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

// Action buttons inside exam cards
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

// Modal overlay
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

// Modal content
const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

// Form group wrapper
const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

// Label for form inputs
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

// Input field
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

// Select dropdown
const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
`;

// ===================== COMPONENT =====================

const TeacherExams = () => {
    // Translation function
    const { t } = useTranslation();

    /* ===================== STATE ===================== */

    // Exams created by teacher
    const [exams, setExams] = useState([]);

    // Subjects assigned to teacher
    const [subjects, setSubjects] = useState([]);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

    // Selected exam for results
    const [selectedExam, setSelectedExam] = useState(null);

    // Exam results data
    const [examResults, setExamResults] = useState([]);

    // Loading indicators
    const [loading, setLoading] = useState(false);
    const [resultsLoading, setResultsLoading] = useState(false);

    // Create exam form data
    const [formData, setFormData] = useState({
        examName: "",
        subjectId: "",
        examDate: "",
        totalMarks: "",
        examLink: "",
    });

    // Logged-in teacher ID
    const teacherId = JSON.parse(sessionStorage.getItem("user"))?.id;

    /* ===================== INITIAL LOAD ===================== */

    // Load subjects and exams on component mount
    useEffect(() => {
        loadData();
    }, []);

    // Fetch teacher subjects and exams
    const loadData = async () => {
        try {
            const [subjectsRes, examsRes] = await Promise.all([
                getTeacherSubjects(teacherId),
                getExamsForTeacher(teacherId),
            ]);
            setSubjects(subjectsRes.data);
            setExams(examsRes.data);
        } catch (error) {
            console.error("Error loading data", error);
        }
    };

    /* ===================== HANDLERS ===================== */

    // Open Google Forms creation page
    const handleCreateGoogleForm = () => {
        window.open("https://docs.google.com/forms/u/0/create", "_blank");
    };

    // View exam results
    const handleViewResults = async (exam) => {
        setSelectedExam(exam);
        setIsResultsModalOpen(true);
        setResultsLoading(true);
        try {
            const res = await getExamResults(exam.id);
            setExamResults(res.data);
        } catch (error) {
            toast.error("Failed to fetch exam results");
        } finally {
            setResultsLoading(false);
        }
    };

    // Create new exam
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!formData.examName || !formData.subjectId || !formData.examDate || !formData.examLink) {
            toast.warning(t('please_fill_all_fields'));
            return;
        }

        try {
            setLoading(true);

            // Find selected subject details
            const selectedSubject = subjects.find(
                s => s.subjectId === parseInt(formData.subjectId)
            );

            if (!selectedSubject || !selectedSubject.courseId) {
                toast.error(t('invalid_subject'));
                return;
            }

            // Prepare payload for backend
            const payload = {
                ...formData,
                courseId: selectedSubject.courseId,
                subjectId: parseInt(formData.subjectId),
                totalMarks: parseInt(formData.totalMarks),
            };

            await createExam(payload);

            // Reset form and reload exams
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
            toast.error(error.response?.data?.message || t('failed_create_exam'));
        } finally {
            setLoading(false);
        }
    };

    /* ===================== UI ===================== */
    return (
        <Container>
            <ToastContainer />

            {/* Header */}
            <Header>
                <Title>{t('manage_exams')}</Title>
                <CreateButton onClick={() => setIsModalOpen(true)}>
                    <FaPlus /> {t('create_new_exam')}
                </CreateButton>
            </Header>

            {/* Exam list */}
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
                                <ActionButton as="a" href={exam.examLink} target="_blank">
                                    <FaExternalLinkAlt /> {t('view_form')}
                                </ActionButton>
                                <ActionButton onClick={() => handleViewResults(exam)}>
                                    <FaEye /> {t('view_results')}
                                </ActionButton>
                            </div>
                        </ExamCard>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', color: '#6c757d' }}>
                        {t('no_exams_created')}
                    </div>
                )}
            </CardGrid>

            {/* Modals remain unchanged */}
        </Container>
    );
};

export default TeacherExams;

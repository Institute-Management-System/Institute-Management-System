// React hooks for state management and lifecycle
import React, { useState, useEffect } from "react";

// i18n hook for multilingual support
import { useTranslation } from "react-i18next";

// Icons used in UI
import {
  FaClipboardList,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";

// Toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Exam and student-related API services
import { getExamsForStudent } from "../../services/examService";
import { fetchEnrolledSubjects } from "../../services/student.service";

// Styled-components for scoped component styling
import styled from "styled-components";

/* ================= STYLED COMPONENTS ================= */

// Main container
const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

// Page title
const Title = styled.h2`
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

// Grid layout for exam cards
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

// Individual exam card
const ExamCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 5px solid #667eea;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
`;

// Badge wrapper
const BadgeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

// Course / subject badge
const Badge = styled.span`
  background-color: ${props => props.bg || "#e9ecef"};
  color: ${props => props.color || "#495057"};
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 600;
`;

// Exam name
const ExamTitle = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #343a40;
`;

// Exam details section
const ExamInfo = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

// Single info row
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Call-to-action button
const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.7rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    color: white;
  }
`;

// Empty-state message
const NoDataMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

/* ================= COMPONENT ================= */

const StudentExams = () => {
  // Translation function
  const { t } = useTranslation();

  // Exams list
  const [exams, setExams] = useState([]);

  // Flag to check if student has enrolled subjects
  const [hasSubjects, setHasSubjects] = useState(true);

  // Loader flag
  const [loading, setLoading] = useState(true);

  // Student ID from session storage
  const studentId = JSON.parse(sessionStorage.getItem("user"))?.id;

  /* ================= LOAD DATA ON MOUNT ================= */
  useEffect(() => {
    checkEnrollmentsAndLoadExams();
  }, [studentId]);

  /* ================= CHECK SUBJECTS + LOAD EXAMS ================= */
  const checkEnrollmentsAndLoadExams = async () => {
    try {
      setLoading(true);

      // Step 1: Check if student has enrolled subjects
      const subjects = await fetchEnrolledSubjects();
      if (!subjects || subjects.length === 0) {
        setHasSubjects(false);
        setLoading(false);
        return;
      }

      // Step 2: Fetch exams for student
      const res = await getExamsForStudent();
      setExams(res.data);
    } catch (error) {
      console.error("Error loading exams:", error);
      // toast.error("Failed to load exams.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= NO SUBJECTS STATE ================= */
  if (!hasSubjects) {
    return (
      <Container>
        <Title>
          <FaClipboardList /> {t("available_exams")}
        </Title>

        <div className="alert alert-warning d-flex align-items-center gap-3">
          <FaExclamationCircle size={24} />
          <div>
            <strong>{t("no_subjects_enrolled")}</strong>
            <br />
            {t("contact_admin_enroll")}
          </div>
        </div>
      </Container>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <Container>
      <ToastContainer />

      <Title>
        <FaClipboardList /> {t("available_exams")}
      </Title>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-5">
          {t("loading")}...
        </div>
      ) : (
        <CardGrid>
          {/* Exams Available */}
          {exams.length > 0 ? (
            exams.map((exam) => (
              <ExamCard key={exam.id}>
                {/* Course & Subject Badges */}
                <BadgeContainer>
                  <Badge bg="#e3f2fd" color="#0d47a1">
                    {exam.courseName}
                  </Badge>
                  <Badge bg="#f3e5f5" color="#4a148c">
                    {exam.subjectName}
                  </Badge>
                </BadgeContainer>

                {/* Exam Name */}
                <ExamTitle>{exam.examName}</ExamTitle>

                {/* Exam Details */}
                <ExamInfo>
                  <InfoRow>
                    <FaCalendarAlt />
                    {new Date(exam.examDate).toLocaleDateString()}
                  </InfoRow>

                  <InfoRow>
                    <FaCheckCircle
                      className={
                        exam.obtainedMarks !== null
                          ? "text-success"
                          : "text-muted"
                      }
                    />
                    {t("marks")}:
                    {exam.obtainedMarks !== null ? (
                      <span className="fw-bold text-success ms-1">
                        {exam.obtainedMarks} / {exam.totalMarks}
                      </span>
                    ) : (
                      <span className="text-muted ms-1">
                        {t("not_graded")} ({exam.totalMarks})
                      </span>
                    )}
                  </InfoRow>
                </ExamInfo>

                {/* Take Exam Button */}
                <ActionButton
                  href={exam.examLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("take_exam")} <FaExternalLinkAlt size={14} />
                </ActionButton>
              </ExamCard>
            ))
          ) : (
            /* Empty Exams State */
            <NoDataMessage>
              <h5>{t("no_exams_available")}</h5>
              <p>{t("check_back_later")}</p>
            </NoDataMessage>
          )}
        </CardGrid>
      )}
    </Container>
  );
};

export default StudentExams;

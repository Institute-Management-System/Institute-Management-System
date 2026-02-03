package com.ims.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.dto.CreateExamDTO;
import com.ims.dto.ExamDTO;
import com.ims.dto.ExamResultDTO;
import com.ims.entity.Course;
import com.ims.entity.Enrollments;
import com.ims.entity.Exams;
import com.ims.entity.Role;
import com.ims.entity.Subject;
import com.ims.entity.User;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.CourseRepository;
import com.ims.repository.EnrollmentRepository;
import com.ims.repository.ExamRepository;
import com.ims.repository.MarksRepository;
import com.ims.repository.SubjectRepository;
import com.ims.repository.UserRepository;
import com.ims.service.ExamService;

import lombok.RequiredArgsConstructor;

// Marks this class as a Spring service component
@Service
// Ensures all public methods run within a transactional context
@Transactional
// Generates constructor for all final fields
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    // Repository to manage Exam entity operations
    private final ExamRepository examRepository;
    // Repository to fetch Course data
    private final CourseRepository courseRepository;
    // Repository to fetch Subject data
    private final SubjectRepository subjectRepository;
    // Repository to manage enrollment records
    private final EnrollmentRepository enrollmentRepository;
    // Repository to manage User data
    private final UserRepository userRepository;
    // Repository to manage Marks data
    private final MarksRepository marksRepository;

    /*================================= Teacher Exam Dashboard =====================================*/

    // Creates a new exam for a given course and subject
    @Override
    public void createExam(CreateExamDTO examDTO) {

        // Fetch course by ID or throw exception if not found
        Course course = courseRepository.findById(examDTO.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        // Fetch subject by ID or throw exception if not found
        Subject subject = subjectRepository.findById(examDTO.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));

        // Create new Exam entity
        Exams exam = new Exams();
        exam.setExamName(examDTO.getExamName());
        exam.setExamDate(examDTO.getExamDate());
        exam.setTotalMarks(examDTO.getTotalMarks());
        exam.setExamLink(examDTO.getExamLink());
        exam.setCourse(course);
        exam.setSubject(subject);
        exam.setStatus(true);

        // Save exam to database
        examRepository.save(exam);
    }

    // Fetch all exams related to a specific teacher
    @Override
    public List<ExamDTO> getExamsForTeacher(Long teacherId) {

        // Fetch all enrollments for the teacher
        List<Enrollments> enrollments = enrollmentRepository.findByUser(
                userRepository.findById(teacherId)
                        .orElseThrow(() -> new ResourceNotFoundException("Teacher not found")));

        // Extract subject IDs assigned to the teacher
        List<Long> subjectIds = enrollments.stream()
                .filter(e -> e.getRole() == Role.TEACHER && e.getSubject() != null)
                .map(e -> e.getSubject().getId())
                .collect(Collectors.toList());

        // If no subjects assigned, return empty list
        if (subjectIds.isEmpty())
            return new ArrayList<>();

        // Fetch exams for the assigned subjects
        List<Exams> exams = examRepository.findBySubject_IdIn(subjectIds);

        // Convert Exam entities to DTOs
        return exams.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Fetch exam results for a specific exam
    @Override
    public List<ExamResultDTO> getExamResults(Long examId) {

        // Fetch exam or throw exception if not found
        Exams exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));

        // Fetch all enrollments (can be optimized using custom query)
        List<Enrollments> enrollments = enrollmentRepository.findAll();

        // Filter students enrolled in the same course and subject
        List<User> students = enrollments.stream()
                .filter(e -> e.getRole() == Role.STUDENT
                        && e.getCourse().getId().equals(exam.getCourse().getId())
                        && e.getSubject() != null
                        && e.getSubject().getId().equals(exam.getSubject().getId()))
                .map(Enrollments::getUser)
                .distinct()
                .collect(Collectors.toList());

        // Build exam result list for each student
        return students.stream().map(student -> {
            ExamResultDTO dto = new ExamResultDTO();
            dto.setStudentId(student.getId());
            dto.setStudentName(student.getFullName());
            dto.setRollNumber(student.getRollNumber());

            // Fetch marks if available
            marksRepository.findByExamIdAndStudentId(examId, student.getId())
                    .ifPresentOrElse(mark -> {
                        dto.setObtainedMarks(mark.getObtainedMarks());
                        dto.setStatus("Present");
                    }, () -> {
                        dto.setObtainedMarks(null);
                        dto.setStatus("Absent / Not Graded");
                    });

            return dto;
        }).collect(Collectors.toList());
    }

    /*================================= Student Exam Dashboard =====================================*/

    // Fetch exams available for a specific student
    @Override
    public List<ExamDTO> getExamsForStudent(Long studentId) {

        // Fetch all enrollments for the student
        List<Enrollments> enrollments = enrollmentRepository.findByUser(
                userRepository.findById(studentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Student not found")));

        // Extract subject IDs for the student
        List<Long> subjectIds = enrollments.stream()
                .filter(e -> e.getRole() == Role.STUDENT && e.getSubject() != null)
                .map(e -> e.getSubject().getId())
                .collect(Collectors.toList());

        // If student has no subjects, return empty list
        if (subjectIds.isEmpty())
            return new ArrayList<>();

        // Fetch exams related to those subjects
        List<Exams> exams = examRepository.findBySubject_IdIn(subjectIds);

        // Map exams to DTOs and attach marks if present
        return exams.stream().map(exam -> {
            ExamDTO dto = mapToDTO(exam);
            marksRepository.findByExamIdAndStudentId(exam.getId(), studentId)
                    .ifPresent(mark -> dto.setObtainedMarks(mark.getObtainedMarks()));
            return dto;
        }).collect(Collectors.toList());
    }

    // Helper method to convert Exam entity to ExamDTO
    private ExamDTO mapToDTO(Exams exam) {
        return new ExamDTO(
                exam.getId(),
                exam.getExamName(),
                exam.getExamDate(),
                exam.getTotalMarks(),
                exam.getStatus(),
                exam.getExamLink(),
                exam.getCourse().getId(),
                exam.getSubject().getId(),
                exam.getCourse().getName(),
                exam.getSubject().getName(),
                null);
    }
}

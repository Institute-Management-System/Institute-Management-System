package com.ims.service.impl;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.math.BigDecimal;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ims.dto.*;
import com.ims.entity.*;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.*;
import com.ims.service.StudentService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    /* ================= DEPENDENCIES ================= */

    private final AttendenceRepository attendenceRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final MarksRepository marksRepository;
    private final FeesRepository feesRepository;
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;
    private final FeedbackRepository feedbackRepository;
    private final ModelMapper modelMapper;

    /* ================= ATTENDANCE ================= */

    private AttendanceSummaryResponse calculateAttendance(
            Long userId,
            Long courseId,
            LocalDate startDate_toggle,
            LocalDate endDate) {
        validateDateRange(startDate_toggle, endDate);

        long total = attendenceRepository
                .countByUserIdAndCourseIdAndAttendanceDateBetween(
                        userId, courseId, startDate_toggle, endDate);

        if (total == 0) {
            return new AttendanceSummaryResponse(0, 0, 0, 0.0);
        }

        long present = attendenceRepository
                .countByUserIdAndCourseIdAndStatusAndAttendanceDateBetween(
                        userId, courseId, Status.PRESENT, startDate_toggle, endDate);

        long absent = attendenceRepository
                .countByUserIdAndCourseIdAndStatusAndAttendanceDateBetween(
                        userId, courseId, Status.ABSENT, startDate_toggle, endDate);

        double percentage = (present * 100.0) / total;

        return new AttendanceSummaryResponse(total, present, absent, percentage);
    }

    @Override
    public AttendanceSummaryResponse getMonthlyAttendance(
            Long userId, Long courseId, String month) {
        YearMonth yearMonth = YearMonth.parse(month);
        return calculateAttendance(
                userId,
                courseId,
                yearMonth.atDay(1),
                yearMonth.atEndOfMonth());
    }

    @Override
    public AttendanceSummaryResponse getOverallAttendance(
            Long userId, Long courseId) {
        return calculateAttendance(
                userId,
                courseId,
                LocalDate.of(2000, 1, 1),
                LocalDate.now());
    }

    @Override
    public List<AttendanceTableResponse> getAttendanceTable(
            Long userId, LocalDate startDate, LocalDate endDate) {
        validateDateRange(startDate, endDate);

        List<AttendanceTableResponse> data = attendenceRepository.findAttendanceTableData(
                userId, startDate, endDate);

        if (data.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No attendance records found for given period");
        }

        return data;
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException(
                    "Start date cannot be after end date");
        }
    }

    /* ================= COUNTS ================= */

    @Override
    public Long CountTotalCourses(Long userId) {
        return enrollmentRepository.countCoursesByUserId(userId);
    }

    @Override
    public Long CountTotalSubjects(Long userId) {
        return enrollmentRepository.countSubjectsByUserId(userId);
    }

    /* ================= SUBJECTS ================= */

    /* ================= SUBJECTS ================= */

    @Override
    public List<EnrolledSubjectResponse> SubjectStudentEnrolled(Long userId) {
        // 1. Find Student's Enrolled Course
        User student = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        // Fetch all enrollments
        List<Enrollments> enrollments = enrollmentRepository.findByUser(student);

        List<EnrolledSubjectResponse> response = new ArrayList<>();
        Set<Long> processedCourseIds = new HashSet<>();

        for (Enrollments enrollment : enrollments) {
            if (enrollment.getCourse() != null && enrollment.getRole() == Role.STUDENT
                    && Boolean.FALSE.equals(enrollment.getInactive())) {

                Long courseId = enrollment.getCourse().getId();

                // Deduplicate: If course already processed, skip
                if (processedCourseIds.contains(courseId)) {
                    continue;
                }

                // Filter: Check if Course is Active (status == true)
                if (Boolean.TRUE.equals(enrollment.getCourse().getStatus())) {
                    processedCourseIds.add(courseId); // Mark course as processed

                    List<Subject> subjects = subjectRepository.findByCourseId(courseId);

                    for (Subject s : subjects) {
                        // Filter: Check if Subject is Active (status == true)
                        if (Boolean.TRUE.equals(s.getStatus())) {
                            response.add(new EnrolledSubjectResponse(
                                    enrollment.getId(), // Enrollment ID (course level)
                                    enrollment.getCourse().getName(),
                                    enrollment.getAssignedDate(),
                                    s.getName(),
                                    s.getSchedulePath()));
                        }
                    }
                }
            }
        }
        return response;
    }

    @Override
    public List<SubjectTimeTableResponse> StudentSubjectTimeTable(Long userId) {
        return enrollmentRepository.findSubjectsTimeTableByUserId(userId);
    }

    @Override
    public List<SubjectMarksResponse> getSubjectMarksForStudent(Long userId) {
        return marksRepository.findSubjectMarksByUserId(userId);
    }

    /* ================= FEES ================= */

    @Override
    public List<FeesResponse> getFeesDetailsForStudent(Long userId) {
        List<Fee> fees = feesRepository.findFeesDetailsByUserId(userId);

        List<FeesResponse> response = new ArrayList<>();
        for (Fee f : fees) {
            response.add(new FeesResponse(
                    f.getId(),
                    f.getCourse().getName(),
                    f.getAmount() != null ? BigDecimal.valueOf(f.getAmount()) : BigDecimal.ZERO,
                    f.getStatus(),
                    f.getPaymentDate()));
        }
        return response;
    }

    /* ================= NOTICES ================= */

    @Override
    public List<NoticeResponse> getLatestNoticesForStudent() {

        List<Notice> notices = noticeRepository.findTop5ByTargetRoleInOrderByPublishDateDesc(
                List.of(Role.STUDENT, Role.ALL));

        List<NoticeResponse> responseList = new ArrayList<>();

        for (Notice notice : notices) {
            if (Boolean.TRUE.equals(notice.getStatus())) {
                responseList.add(
                        modelMapper.map(notice, NoticeResponse.class));
            }
        }
        return responseList;
    }

    @Override
    public List<NoticeResponse> getAllNoticesForStudent() {

        List<Notice> notices = noticeRepository.findAllByTargetRoleInOrderByPublishDateDesc(
                List.of(Role.STUDENT, Role.ALL));

        List<NoticeResponse> responseList = new ArrayList<>();

        for (Notice notice : notices) {
            if (Boolean.TRUE.equals(notice.getStatus())) {
                responseList.add(
                        modelMapper.map(notice, NoticeResponse.class));
            }
        }
        return responseList;
    }

    /* ================= PROFILE ================= */

    @Override
    public StudentProfileResponse getStudentProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        return modelMapper.map(user, StudentProfileResponse.class);
    }

    @Override
    public StudentProfileResponse updateStudentProfile(
            Long userId,
            StudentProfileUpdateRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        // ✅ allowed updates only
        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }

        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            user.setPhone(request.getPhone());
        }

        // ✅ profile image upload
        MultipartFile image = request.getProfileImage();
        if (image != null && !image.isEmpty()) {
            try {
                String uploadDir = "uploads/profile/";
                java.nio.file.Files.createDirectories(
                        java.nio.file.Paths.get(uploadDir));

                String fileName = java.util.UUID.randomUUID()
                        + "_" + image.getOriginalFilename();

                java.nio.file.Path filePath = java.nio.file.Paths.get(uploadDir + fileName);

                java.nio.file.Files.copy(
                        image.getInputStream(),
                        filePath,
                        java.nio.file.StandardCopyOption.REPLACE_EXISTING);

                user.setProfileImage("/uploads/profile/" + fileName);
            } catch (Exception e) {
                throw new RuntimeException("Profile image upload failed");
            }
        }

        userRepository.save(user);
        return modelMapper.map(user, StudentProfileResponse.class);
    }

    /* ================= COURSES & SUBJECTS ================= */

    @Override
    public List<CourseResponse> getStudentCourses(Long userId) {
        return courseRepository.findDistinctCoursesByStudent(userId);
    }

    @Override
    public List<SubjectResponse> getSubjectsByCourse(
            Long studentId, Long courseId) {
        return subjectRepository
                .findSubjectsByStudentAndCourse(studentId, courseId);
    }

    /* ================= FEEDBACK ================= */

    @Override
    public void submitFeedback(
            Long studentId, StudentFeedbackRequest request) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));

        Feedback feedback = modelMapper.map(request, Feedback.class);
        feedback.setUser(student);
        feedback.setCourse(course);
        feedback.setSubject(subject);
        feedback.setFeedbackDate(LocalDate.now());

        feedbackRepository.save(feedback);
    }

    /* ================= FEEDBACK (VIEW WITH ADMIN RESPONSE) ================= */

    @Override
    public List<StudentFeedbackResponseDTO> getStudentFeedbacks(Long studentId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        List<Feedback> feedbacks = feedbackRepository.findByUserIdOrderByCreatedOnDesc(studentId);

        List<StudentFeedbackResponseDTO> responseList = new ArrayList<>();

        for (Feedback f : feedbacks) {
            responseList.add(
                    StudentFeedbackResponseDTO.builder()
                            .feedbackId(f.getId())
                            .feedbackText(f.getFeedbackText())
                            .rating(f.getRating())
                            .feedbackDate(f.getFeedbackDate())
                            .responseText(f.getResponseText())
                            .respondedAt(f.getRespondedAt())
                            .courseId(f.getCourse().getId())
                            .courseName(f.getCourse().getName())
                            .subjectId(f.getSubject().getId())
                            .subjectName(f.getSubject().getName())
                            .build());
        }

        return responseList;
    }

}
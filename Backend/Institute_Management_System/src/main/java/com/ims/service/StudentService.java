package com.ims.service;

import java.time.LocalDate;
import java.util.List;

import com.ims.dto.AttendanceSummaryResponse;
import com.ims.dto.AttendanceTableResponse;
import com.ims.dto.CourseResponse;
import com.ims.dto.EnrolledSubjectResponse;
import com.ims.dto.FeesResponse;
import com.ims.dto.NoticeResponse;
import com.ims.dto.StudentFeedbackRequest;
import com.ims.dto.StudentFeedbackResponseDTO;
import com.ims.dto.StudentProfileResponse;
import com.ims.dto.StudentProfileUpdateRequest;
import com.ims.dto.SubjectMarksResponse;
import com.ims.dto.SubjectResponse;
import com.ims.dto.SubjectTimeTableResponse;

public interface StudentService {

    AttendanceSummaryResponse getMonthlyAttendance(
            Long userId,
            Long courseId,
            String month);

    AttendanceSummaryResponse getOverallAttendance(
            Long userId,
            Long courseId);

    List<AttendanceTableResponse> getAttendanceTable(
            Long userId,
            LocalDate startDate,
            LocalDate endDate);

    Long CountTotalCourses(Long userId);

    Long CountTotalSubjects(Long userId);

    List<EnrolledSubjectResponse> SubjectStudentEnrolled(Long userId);

    List<SubjectTimeTableResponse> StudentSubjectTimeTable(Long userId);

    List<SubjectMarksResponse> getSubjectMarksForStudent(Long userId);

    List<FeesResponse> getFeesDetailsForStudent(Long userId);

    List<NoticeResponse> getLatestNoticesForStudent();

    List<NoticeResponse> getAllNoticesForStudent();

    StudentProfileResponse getStudentProfile(Long userId);

    StudentProfileResponse updateStudentProfile(
            Long userId,
            StudentProfileUpdateRequest request);

    List<CourseResponse> getStudentCourses(Long userId);

    List<SubjectResponse> getSubjectsByCourse(Long studentId, Long courseId);

    void submitFeedback(Long studentId, StudentFeedbackRequest request);
    
    List<StudentFeedbackResponseDTO> getStudentFeedbacks(Long studentId);

}
package com.ims.service;

// ===================== IMPORTS =====================

// Java collection utilities
import java.util.List;

// DTO imports used by TeacherService
import com.ims.dto.MarksSubmitRequestDTO;
import com.ims.dto.MySubjectDTO;
import com.ims.dto.NoticeResponse;
import com.ims.dto.StudentAttendanceDTO;
import com.ims.dto.StudentListDTO;
import com.ims.dto.StudentMarksViewDTO;
import com.ims.dto.TeacherMyAttendanceDTO;
import com.ims.dto.TeacherProfileResponse;
import com.ims.dto.TeacherProfileUpdateRequest;
import com.ims.dto.TeacherScheduleDTO;

// Entity import (currently not used directly, but part of domain)
import com.ims.entity.Role;

// ===================== SERVICE INTERFACE =====================

/**
 * TeacherService
 * 
 * This interface defines all business operations related to
 * teacher functionality such as dashboard data, profile,
 * students, attendance, subjects, exams, and notices.
 */
public interface TeacherService {

    /* ================= Teacher DASHBOARD ================= */

    // Count total students assigned to a specific teacher
    long countStudentsForTeacher(Long teacherId);

    // Count total subjects assigned to a teacher
    long countAssignedSubjects(Long teacherId);

    // Get average monthly attendance in present/total format
    String getAverageMonthlyAttendance();

    // Get latest notices for teacher dashboard
    List<NoticeResponse> getLatestNoticesForTeacher();

    

    /* ================= TEACHER PROFILE ================= */

    // Fetch teacher profile details
    TeacherProfileResponse getTeacherProfile(Long userId);

    // Update editable teacher profile fields
    TeacherProfileResponse updateTeacherProfile(
            Long userId,
            TeacherProfileUpdateRequest request
    );

    
    
    
    /* ================= STUDENTS Information ================= */

    // Get list of all students
    List<StudentListDTO> getAllStudents();

    // Get students for marks entry using course and subject
    List<StudentMarksViewDTO> getStudentsForMarksByName(
            String courseName,
            String subjectName
    );
    
    // Get subjects assigned to a teacher
    List<MySubjectDTO> getMySubjects(Long teacherId);

    // Submit or update marks for students
    void submitMarks(MarksSubmitRequestDTO request);

    // Get attendance list of students (teacher view)
    List<StudentAttendanceDTO> getStudentAttendanceList();
    
    
    

    /* ================= Teacher Subjects ========================= */

    // Get teacher schedule (classes, subjects, timings)
    List<TeacherScheduleDTO> getTeacherSchedule(Long teacherId);

    

    
    
    
    /* ================= Teacher Attendance ================= */

    // Get logged-in teacher's own attendance records
    List<TeacherMyAttendanceDTO> getMyAttendance(Long teacherId);

    /* ================= Teacher Exam Dashboard ================= */
    
    

    /* Exam-related operations are handled in ExamServiceImpl */
    
    
    
    /* ================= Notices ================= */

    // Get all notices visible to teachers
    List<NoticeResponse> getAllNoticesForTeacher();

}

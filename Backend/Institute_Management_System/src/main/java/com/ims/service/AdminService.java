package com.ims.service;

import com.ims.dto.CourseDTO;
import com.ims.dto.StudentDTO;
import com.ims.dto.SubjectDTO;
import com.ims.dto.AdminFeeDTO;
import com.ims.dto.AdminStudentMarksDTO;
import com.ims.dto.AdminFeedbackDTO;
import com.ims.dto.AdminStudentAttendanceDTO;
import com.ims.dto.AdminTeacherAttendanceDTO;
import com.ims.entity.User;
import com.ims.entity.Course;
import com.ims.entity.Subject;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface AdminService {

    // Student Operations
    User addStudent(StudentDTO studentDTO);

    User updateStudent(Long id, StudentDTO studentDTO);

    void deleteStudent(Long id);

    List<User> getAllStudents();

    User getStudentById(Long id);

    // Teacher Operations
    User addTeacher(StudentDTO teacherDTO);

    User updateTeacher(Long id, StudentDTO teacherDTO);

    void deleteTeacher(Long id);

    List<User> getAllTeachers();

    User getTeacherById(Long id);

    // Course Operations
    Course addCourse(CourseDTO courseDTO);

    Course updateCourse(Long id, CourseDTO courseDTO);

    void deleteCourse(Long id);

    List<Course> getAllCourses();

    Course getCourseById(Long id);

    // Subject Operations
    Subject addSubject(SubjectDTO subjectDTO, org.springframework.web.multipart.MultipartFile scheduleFile);

    Subject updateSubject(Long id, SubjectDTO subjectDTO, MultipartFile scheduleFile);

    void deleteSubject(Long id);

    List<Subject> getAllSubjects();

    List<Subject> getSubjectsByCourseId(Long courseId);

    Subject getSubjectById(Long id);

    // Marks Operations
    List<AdminStudentMarksDTO> getMarksByCourseAndSubject(Long courseId, Long subjectId);

    // Fee Operations
    List<AdminFeeDTO> getAllStudentFees();

    AdminFeeDTO updateFeeStatus(Long feeId, String status);

    // Feedback Operations
    List<AdminFeedbackDTO> getAllFeedbacks();

    AdminFeedbackDTO respondToFeedback(Long feedbackId, String response);

    // Attendance Operations
    List<AdminStudentAttendanceDTO> getStudentAttendanceList();

    List<AdminTeacherAttendanceDTO> getTeacherAttendanceList();

    // Notice Operations
    com.ims.entity.Notice addNotice(com.ims.entity.Notice notice);

    List<com.ims.entity.Notice> getAllNotices();

    void deleteNotice(Long id);

    User toggleUserStatus(Long id);

    Course toggleCourseStatus(Long id);

    Subject toggleSubjectStatus(Long id);

    int saveUsers(MultipartFile file);
}

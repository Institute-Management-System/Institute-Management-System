package com.ims.controller;

/* ===================== IMPORTS ===================== */

// Java utility
import java.util.List;

// Spring Web & HTTP utilities
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// DTO imports
import com.ims.dto.*;

// Service layer imports
import com.ims.service.ExamService;
import com.ims.service.TeacherService;

// Lombok annotation for constructor injection
import lombok.RequiredArgsConstructor;



/* ===================== CONTROLLER ===================== */

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
// DO NOT ADD @CrossOrigin here. It conflicts with SecurityConfig
// (AllowCredentials=true)
public class TeacherController {

    /* ===================== DEPENDENCIES ===================== */

    // Teacher-related business logic
    private final TeacherService teacherService;

    // Exam-related business logic
    private final ExamService examService;
    
    
    

    /* ================= Teacher DASHBOARD ================= */

    // Get total students under a specific teacher
    // GET /teacher/student-count/{teacherId}
    @GetMapping("/student-count/{teacherId}")
    public ResponseEntity<Long> getStudentCountForTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(teacherService.countStudentsForTeacher(teacherId));
    }

    // Get count of subjects assigned to a teacher
    // GET /teacher/subject-count/{teacherId}
    @GetMapping("/subject-count/{teacherId}")
    public ResponseEntity<Long> getAssignedSubjectCount(@PathVariable Long teacherId) {
        return ResponseEntity.ok(teacherService.countAssignedSubjects(teacherId));
    }

    // Get average monthly attendance (present/total)
    // GET /teacher/average-attendance
    @GetMapping("/average-attendance")
    public String getAverageMonthlyAttendance() {
        return teacherService.getAverageMonthlyAttendance();
    }

    // Get latest top notices for teacher dashboard
    // GET /teacher/notices/top
    @GetMapping("/notices/top")
    public ResponseEntity<ApiResponseDTO> getLatestNotices() {
        List<NoticeResponse> notices = teacherService.getLatestNoticesForTeacher();
        return ResponseEntity.ok(new ApiResponseDTO(notices, "SUCCESS"));
    }
    
    
    
    

    /* ================= TEACHER PROFILE ================= */

    // Get teacher profile details
    // GET /teacher/profile/{teacherId}
    @GetMapping("/profile/{teacherId}")
    public ResponseEntity<ApiResponseDTO> getTeacherProfile(@PathVariable Long teacherId) {
        TeacherProfileResponse response = teacherService.getTeacherProfile(teacherId);
        return ResponseEntity.ok(new ApiResponseDTO(response, "SUCCESS"));
    }

    // Update teacher profile details
    // PUT /teacher/update/{teacherId}
    @PutMapping("/update/{teacherId}")
    public ResponseEntity<ApiResponseDTO> updateTeacherProfile(
            @PathVariable Long teacherId,
            @RequestBody TeacherProfileUpdateRequest request) {

        TeacherProfileResponse response =
                teacherService.updateTeacherProfile(teacherId, request);

        return ResponseEntity.ok(new ApiResponseDTO(response, "UPDATED"));
    }
    
    
    

    /* ================= STUDENTS INFORMATION ================= */

    // Get list of all students
    // GET /teacher/allstudents
    @GetMapping("/allstudents")
    public ResponseEntity<List<StudentListDTO>> getAllStudents() {
        return ResponseEntity.ok(teacherService.getAllStudents());
    }

    // Get attendance list of students
    // GET /teacher/attendance
    @GetMapping("/attendance")
    public ResponseEntity<List<StudentAttendanceDTO>> getStudentAttendanceList() {
        return ResponseEntity.ok(teacherService.getStudentAttendanceList());
    }

    // Get subjects assigned to a teacher (for evaluation)
    // GET /teacher/subjects/teacher/{teacherId}
    @GetMapping("/subjects/teacher/{teacherId}")
    public ResponseEntity<List<MySubjectDTO>> getMySubjects(@PathVariable Long teacherId) {
        return ResponseEntity.ok(teacherService.getMySubjects(teacherId));
    }

    // Load students for marks entry using course & subject
    // GET /teacher/students-for-marks/by-name
    @GetMapping("/students-for-marks/by-name")
    public List<StudentMarksViewDTO> loadStudentsForMarksByName(
            @RequestParam String courseName,
            @RequestParam String subjectName) {
        return teacherService.getStudentsForMarksByName(courseName, subjectName);
    }

    // Submit marks for students
    // POST /teacher/submit-marks
    @PostMapping("/submit-marks")
    public ResponseEntity<ApiResponseDTO> submitMarks(
            @RequestBody MarksSubmitRequestDTO request) {

        teacherService.submitMarks(request);
        return ResponseEntity.ok(new ApiResponseDTO(null, "MARKS_SAVED"));
    }

    
    
    
    
    
    /* ================= Teacher Attendance ================= */

    // Get logged-in teacher's attendance
    // GET /teacher/my-attendance/{teacherId}
    @GetMapping("/my-attendance/{teacherId}")
    public ResponseEntity<List<TeacherMyAttendanceDTO>> getMyAttendance(
            @PathVariable Long teacherId) {

        return ResponseEntity.ok(teacherService.getMyAttendance(teacherId));
    }
    
    
    

    /* ================= Teacher Schedule ================= */

    // Get teacher class schedule
    // GET /teacher/schedule/{teacherId}
    @GetMapping("/schedule/{teacherId}")
    public ResponseEntity<List<TeacherScheduleDTO>> getTeacherSchedule(
            @PathVariable Long teacherId) {

        return ResponseEntity.ok(teacherService.getTeacherSchedule(teacherId));
    }
    
    
    

    /* =================== EXAMS ==================== */

    // Create a new exam
    // POST /teacher/exams/create
    @PostMapping("/exams/create")
    public ResponseEntity<ApiResponseDTO> createExam(
            @RequestBody CreateExamDTO examDTO) {

        examService.createExam(examDTO);
        return ResponseEntity.ok(new ApiResponseDTO(null, "EXAM_CREATED"));
    }

    // Get all exams created by a specific teacher
    // GET /teacher/exams/{teacherId}
    @GetMapping("/exams/{teacherId}")
    public ResponseEntity<List<ExamDTO>> getExamsForTeacher(
            @PathVariable Long teacherId) {

        return ResponseEntity.ok(examService.getExamsForTeacher(teacherId));
    }

    // Get exam results for a specific exam
    // GET /teacher/exams/{examId}/results
    @GetMapping("/exams/{examId}/results")
    public ResponseEntity<List<ExamResultDTO>> getExamResults(
            @PathVariable Long examId) {

        return ResponseEntity.ok(examService.getExamResults(examId));
    }
    
    
    
    

    /* ================= Notices ================= */

    // Get all notices for teacher
    // GET /teacher/notices
    @GetMapping("/notices")
    public ResponseEntity<ApiResponseDTO> getAllNotices() {

        List<NoticeResponse> notices = teacherService.getAllNoticesForTeacher();
        return ResponseEntity.ok(new ApiResponseDTO(notices, "SUCCESS"));
    }
}

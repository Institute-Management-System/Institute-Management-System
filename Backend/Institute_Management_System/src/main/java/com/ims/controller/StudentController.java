package com.ims.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ims.dto.*;
import com.ims.entity.User;
import com.ims.service.ExamService;
import com.ims.service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
// ❌ DO NOT ADD @CrossOrigin here. It conflicts with SecurityConfig
// (AllowCredentials=true)
public class StudentController {

        private final StudentService studentService;
        private final ExamService examService;

        // ================= MONTHLY ATTENDANCE =================
        @PostMapping("/attendance/monthly")
        public ResponseEntity<ApiResponseDTO> getMonthlyAttendance(
                        Authentication authentication,
                        @RequestBody MonthlyAttendanceRequest request) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                AttendanceSummaryResponse response = studentService.getMonthlyAttendance(
                                userId,
                                request.getCourseId(),
                                request.getMonth());

                return ResponseEntity.ok(new ApiResponseDTO(response, "SUCCESS"));
        }

        // ================= OVERALL ATTENDANCE =================
        @PostMapping("/attendance/overall")
        public ResponseEntity<ApiResponseDTO> getOverallAttendance(
                        Authentication authentication,
                        @RequestBody OverallAttendanceRequest request) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                AttendanceSummaryResponse response = studentService.getOverallAttendance(
                                userId,
                                request.getCourseId());

                return ResponseEntity.ok(new ApiResponseDTO(response, "SUCCESS"));
        }

        // ================= ATTENDANCE TABLE =================
        @PostMapping("/attendance/table")
        public ResponseEntity<ApiResponseDTO> getAttendanceTable(
                        Authentication authentication,
                        @RequestBody AttendanceRangeRequest request) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                List<AttendanceTableResponse> response = studentService.getAttendanceTable(
                                userId,
                                request.getStartDate(),
                                request.getEndDate());

                return ResponseEntity.ok(new ApiResponseDTO(response, "SUCCESS"));
        }

        /* ================= EXAMS ================= */
        @GetMapping("/exams")
        public ResponseEntity<List<ExamDTO>> getExamsForStudent(Authentication authentication) {
                Long studentId = ((User) authentication.getPrincipal()).getId();
                return ResponseEntity.ok(examService.getExamsForStudent(studentId));
        }

        // ================= TOTAL COURSES =================
        @GetMapping("/courses/count")
        public ResponseEntity<ApiResponseDTO> countTotalCourses(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                Long count = studentService.CountTotalCourses(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(count, "SUCCESS"));
        }

        // ================= TOTAL SUBJECTS =================
        @GetMapping("/subjects/count")
        public ResponseEntity<ApiResponseDTO> countTotalSubjects(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                Long count = studentService.CountTotalSubjects(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(count, "SUCCESS"));
        }

        // ================= ENROLLED SUBJECTS =================
        @GetMapping("/subjects/enrolled")
        public ResponseEntity<ApiResponseDTO> getEnrolledSubjects(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                List<EnrolledSubjectResponse> response = studentService.SubjectStudentEnrolled(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(response, "SUCCESS"));
        }

        // ================= SUBJECT TIMETABLE =================
        @GetMapping("/subjects/timetable")
        public ResponseEntity<ApiResponseDTO> getSubjectTimeTable(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                List<SubjectTimeTableResponse> response = studentService.StudentSubjectTimeTable(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(response, "SUCCESS"));
        }

        @GetMapping("/marks")
        public ResponseEntity<ApiResponseDTO> getStudentMarks(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                List<SubjectMarksResponse> response = studentService.getSubjectMarksForStudent(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(response, "SUCCESS"));
        }

        @GetMapping("/fees")
        public ResponseEntity<ApiResponseDTO> getStudentFees(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                List<FeesResponse> response = studentService.getFeesDetailsForStudent(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(response, "SUCCESS"));
        }

        @GetMapping("/notices/top")
        public ResponseEntity<ApiResponseDTO> getLatestNotices() {

                List<NoticeResponse> notices = studentService.getLatestNoticesForStudent();

                return ResponseEntity.ok(
                                new ApiResponseDTO(notices, "SUCCESS"));
        }

        // 🔹 Full notice list
        @GetMapping("/notices")
        public ResponseEntity<ApiResponseDTO> getAllNotices() {

                List<NoticeResponse> notices = studentService.getAllNoticesForStudent();

                return ResponseEntity.ok(
                                new ApiResponseDTO(notices, "SUCCESS"));
        }

        @GetMapping("/profile")
        public ResponseEntity<ApiResponseDTO> getStudentProfile(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                StudentProfileResponse response = studentService.getStudentProfile(userId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(response, "SUCCESS"));
        }

        @PutMapping(value = "/update", consumes = "multipart/form-data")
        public ResponseEntity<ApiResponseDTO> updateStudentProfile(
                        Authentication authentication,
                        @ModelAttribute StudentProfileUpdateRequest request) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                StudentProfileResponse response = studentService.updateStudentProfile(userId, request);

                return ResponseEntity.ok(new ApiResponseDTO(response, "UPDATED"));
        }

        @GetMapping("/courses")
        public ResponseEntity<ApiResponseDTO> getStudentCourses(
                        Authentication authentication) {
                Long userId = ((User) authentication.getPrincipal()).getId();

                return ResponseEntity.ok(
                                new ApiResponseDTO(
                                                studentService.getStudentCourses(userId),
                                                "SUCCESS"));
        }

        @GetMapping("/subjects/by-course/{courseId}")
        public ResponseEntity<ApiResponseDTO> getSubjectsByCourse(
                        Authentication authentication,
                        @PathVariable Long courseId) {

                Long studentId = ((User) authentication.getPrincipal()).getId();

                List<SubjectResponse> subjects = studentService.getSubjectsByCourse(studentId, courseId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(subjects, "SUCCESS"));
        }

        @PostMapping("/feedback")
        public ResponseEntity<ApiResponseDTO> submitFeedback(
                        Authentication authentication,
                        @RequestBody StudentFeedbackRequest request) {
                Long studentId = ((User) authentication.getPrincipal()).getId();

                studentService.submitFeedback(studentId, request);

                return ResponseEntity.ok(
                                new ApiResponseDTO(null, "Feedback submitted successfully"));
        }

        @GetMapping("/feedback")
        public ResponseEntity<ApiResponseDTO> getStudentFeedbacks(
                        Authentication authentication) {

                Long studentId = ((User) authentication.getPrincipal()).getId();

                List<StudentFeedbackResponseDTO> response = studentService.getStudentFeedbacks(studentId);

                return ResponseEntity.ok(
                                new ApiResponseDTO(response, "SUCCESS"));
        }
}
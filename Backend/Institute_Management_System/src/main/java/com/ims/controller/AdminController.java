package com.ims.controller;

import com.ims.dto.AdminFeeDTO;
import com.ims.dto.AdminFeedbackDTO;
import com.ims.dto.AdminStudentAttendanceDTO;
import com.ims.dto.AdminStudentMarksDTO;
import com.ims.dto.AdminTeacherAttendanceDTO;
import com.ims.dto.CourseDTO;
import com.ims.dto.StudentDTO;
import com.ims.dto.SubjectDTO;
import com.ims.entity.Course;
import com.ims.entity.Notice;
import com.ims.entity.Subject;
import com.ims.entity.User;
import com.ims.helper.CSVHelper;
import com.ims.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*") // Allow frontend to access
public class AdminController {

    @Autowired
    private AdminService adminService;

    // --- Student Endpoints ---

    @PostMapping("/students")
    public ResponseEntity<User> addStudent(@RequestBody StudentDTO studentDTO) {
        User user = adminService.addStudent(studentDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<User> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getStudentById(id));
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<User> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(adminService.updateStudent(id, studentDTO));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        adminService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    // --- Teacher Endpoints ---

    @PostMapping("/teachers")
    public ResponseEntity<User> addTeacher(@RequestBody StudentDTO teacherDTO) {
        User user = adminService.addTeacher(teacherDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<User>> getAllTeachers() {
        return ResponseEntity.ok(adminService.getAllTeachers());
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<User> getTeacherById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getTeacherById(id));
    }

    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        adminService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/teachers/{id}")
    public ResponseEntity<User> updateTeacher(@PathVariable Long id, @RequestBody StudentDTO teacherDTO) {
        return ResponseEntity.ok(adminService.updateTeacher(id, teacherDTO));
    }

    // --- Course Endpoints ---

    @PostMapping("/courses")
    public ResponseEntity<Course> addCourse(@RequestBody CourseDTO courseDTO) {
        Course course = adminService.addCourse(courseDTO);
        return new ResponseEntity<>(course, HttpStatus.CREATED);
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) {
        return ResponseEntity.ok(adminService.updateCourse(id, courseDTO));
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(adminService.getAllCourses());
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCourseById(id));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        adminService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    // --- Subject Endpoints ---

    @PostMapping(value = "/subjects", consumes = { "multipart/form-data" })
    public ResponseEntity<Subject> addSubject(
            @RequestPart("subject") SubjectDTO subjectDTO,
            @RequestPart(value = "schedule", required = false) MultipartFile scheduleFile) {
        Subject subject = adminService.addSubject(subjectDTO, scheduleFile);
        return new ResponseEntity<>(subject, HttpStatus.CREATED);
    }

    @PutMapping(value = "/subjects/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<Subject> updateSubject(
            @PathVariable Long id,
            @RequestPart("subject") SubjectDTO subjectDTO,
            @RequestPart(value = "schedule", required = false) MultipartFile scheduleFile) {
        return ResponseEntity.ok(adminService.updateSubject(id, subjectDTO, scheduleFile));
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(adminService.getAllSubjects());
    }

    @GetMapping("/courses/{courseId}/subjects")
    public ResponseEntity<List<Subject>> getSubjectsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(adminService.getSubjectsByCourseId(courseId));
    }

    @GetMapping("/subjects/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getSubjectById(id));
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        adminService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }

    // --- Notice Endpoints ---

    @PostMapping("/notices")
    public ResponseEntity<Notice> addNotice(@RequestBody Notice notice) {
        return new ResponseEntity<>(adminService.addNotice(notice), HttpStatus.CREATED);
    }

    @GetMapping("/notices")
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(adminService.getAllNotices());
    }

    @DeleteMapping("/notices/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        adminService.deleteNotice(id);
        return ResponseEntity.ok().build();
    }

    // --- Fee Endpoints ---

    @GetMapping("/fees")
    public ResponseEntity<List<AdminFeeDTO>> getAllStudentFees() {
        return ResponseEntity.ok(adminService.getAllStudentFees());
    }

    @PutMapping("/fees/{id}/status")
    public ResponseEntity<AdminFeeDTO> updateFeeStatus(@PathVariable Long id, @RequestBody String status) {
        String cleanedStatus = status.replaceAll("\"", "").trim();
        return ResponseEntity.ok(adminService.updateFeeStatus(id, cleanedStatus));
    }

    // --- Student Marks Endpoints ---

    @GetMapping("/marks/search")
    public ResponseEntity<List<AdminStudentMarksDTO>> getMarksByCourseAndSubject(
            @RequestParam Long courseId,
            @RequestParam Long subjectId) {
        return ResponseEntity.ok(adminService.getMarksByCourseAndSubject(courseId, subjectId));
    }

    // --- Feedback Endpoints ---

    @GetMapping("/feedbacks")
    public ResponseEntity<List<AdminFeedbackDTO>> getAllFeedbacks() {
        return ResponseEntity.ok(adminService.getAllFeedbacks());
    }

    @PutMapping("/feedbacks/{id}/respond")
    public ResponseEntity<AdminFeedbackDTO> respondToFeedback(@PathVariable Long id, @RequestBody String response) {
        String cleanedResponse = response.replaceAll("\"", "").trim();
        return ResponseEntity.ok(adminService.respondToFeedback(id, cleanedResponse));
    }

    // --- Attendance Endpoints ---

    @GetMapping("/attendance/students")
    public ResponseEntity<List<AdminStudentAttendanceDTO>> getStudentAttendanceReport() {
        return ResponseEntity.ok(adminService.getStudentAttendanceList());
    }

    @GetMapping("/attendance/teachers")
    public ResponseEntity<List<AdminTeacherAttendanceDTO>> getTeacherAttendanceReport() {
        return ResponseEntity.ok(adminService.getTeacherAttendanceList());
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<User> toggleUserStatus(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.toggleUserStatus(id));
    }

    @PutMapping("/courses/{id}/status")
    public ResponseEntity<Course> toggleCourseStatus(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.toggleCourseStatus(id));
    }

    @PutMapping("/subjects/{id}/status")
    public ResponseEntity<Subject> toggleSubjectStatus(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.toggleSubjectStatus(id));
    }

    @PostMapping(value = "/users/upload", consumes = { "multipart/form-data" })
    public ResponseEntity<String> uploadUsers(
            @RequestPart("file") MultipartFile file) {
        if (CSVHelper.hasCSVFormat(file)) {
            try {
                int count = adminService.saveUsers(file);
                return ResponseEntity
                        .ok("Uploaded " + count + " users successfully from file: " + file.getOriginalFilename());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                        .body("Could not upload the file: " + file.getOriginalFilename() + "!");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a csv file!");
    }
}

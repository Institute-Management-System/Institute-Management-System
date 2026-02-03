package com.ims.service.impl;

// ===================== IMPORTS =====================
// Java time utilities for date and time handling
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

// Collection utilities
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// ModelMapper for DTO to Entity mapping
import org.modelmapper.ModelMapper;

// Spring framework annotations
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// DTO imports
import com.ims.dto.MarksEntryDTO;
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

// Entity imports
import com.ims.entity.Exams;
import com.ims.entity.Marks;
import com.ims.entity.Notice;
import com.ims.entity.Role;
import com.ims.entity.Status;
import com.ims.entity.User;

// Custom exception
import com.ims.exception.ResourceNotFoundException;

// Repository imports
import com.ims.repository.AttendenceRepository;
import com.ims.repository.EnrollmentRepository;
import com.ims.repository.ExamRepository;
import com.ims.repository.MarksRepository;
import com.ims.repository.NoticeRepository;
import com.ims.repository.UserRepository;

// Service interface
import com.ims.service.TeacherService;


// ===================== SERVICE IMPLEMENTATION =====================

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

    /* ===================== DEPENDENCY INJECTION ===================== */
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private ExamRepository examsRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private AttendenceRepository attendenceRepository;

    // ModelMapper instance for DTO conversion
    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private com.ims.repository.SubjectRepository subjectRepository;
    
    

    /* ================= Teacher DASHBOARD ================= */

    // Count total students assigned to a teacher
    @Override
    public long countStudentsForTeacher(Long teacherId) {
        return enrollmentRepository.countStudentsByTeacherId(teacherId);
    }

    // Count total subjects assigned to a teacher
    @Override
    public long countAssignedSubjects(Long teacherId) {
        return subjectRepository.countByTeacherId(teacherId);
    }

    // Calculate average monthly attendance (PRESENT / TOTAL)
    @Override
    public String getAverageMonthlyAttendance() {

        // Get current year and month
        YearMonth currentMonth = YearMonth.now();

        // First day of current month
        LocalDate startDate = currentMonth.atDay(1);

        // Last day of current month
        LocalDate endDate = currentMonth.atEndOfMonth();

        // Count total classes conducted in the month
        long totalClasses = attendenceRepository.countTotalClasses(startDate, endDate);

        // Count total PRESENT entries in the month
        long totalPresents = attendenceRepository.countByStatusAndDateRange(
                Status.PRESENT, startDate, endDate);

        // Handle case when no classes are conducted
        if (totalClasses == 0) {
            return "0/0";
        }

        // Return attendance in present/total format
        return totalPresents + "/" + totalClasses;
    }

    // Fetch latest 5 active notices for teacher dashboard
    @Override
    public List<NoticeResponse> getLatestNoticesForTeacher() {

        // Fetch top 5 notices targeted to TEACHER or ALL
        List<Notice> notices = noticeRepository.findTop5ByTargetRoleInOrderByPublishDateDesc(
                List.of(Role.TEACHER, Role.ALL));

        List<NoticeResponse> responseList = new ArrayList<>();

        // Filter only active notices
        for (Notice notice : notices) {
            if (Boolean.TRUE.equals(notice.getStatus())) {
                responseList.add(
                        modelMapper.map(notice, NoticeResponse.class));
            }
        }
        return responseList;
    }

    
    
    /* ======================= Teacher Profile ====================== */

    // Get teacher profile details
    @Override
    public TeacherProfileResponse getTeacherProfile(Long teacherId) {

        // Fetch teacher by ID and role
        User teacher = userRepository.findByIdAndRole(teacherId, Role.TEACHER)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        return modelMapper.map(teacher, TeacherProfileResponse.class);
    }

    // Update editable fields of teacher profile
    @Override
    public TeacherProfileResponse updateTeacherProfile(
            Long teacherId,
            TeacherProfileUpdateRequest request) {

        User user = userRepository.findByIdAndRole(teacherId, Role.TEACHER)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        // Update only allowed fields
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }

        if (request.getDesignation() != null) {
            user.setDesignation(request.getDesignation());
        }

        // Restricted fields are intentionally not updated
        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser, TeacherProfileResponse.class);
    }
    
    

    /* ================= STUDENTS Information ================= */

    // Get list of all students
    @Override
    public List<StudentListDTO> getAllStudents() {
        return userRepository.findStudentListDTOByRole(Role.STUDENT);
    }

    // Get students eligible for marks entry
    @Override
    public List<StudentMarksViewDTO> getStudentsForMarksByName(String courseName, String subjectName) {

        Optional<Exams> examOpt = examsRepository.findByCourseNameAndSubjectName(
                courseName,
                subjectName);

        // Return empty list if exam not found
        if (examOpt.isEmpty()) {
            return List.of();
        }

        // Fetch enrolled students for marks entry
        return enrollmentRepository.findStudentsForMarks(
                examOpt.get().getCourse().getId(),
                examOpt.get().getSubject().getId(),
                examOpt.get().getId(),
                Role.STUDENT);
    }

    // Get subjects assigned to a teacher
    @Override
    public List<MySubjectDTO> getMySubjects(Long teacherId) {
        return enrollmentRepository.findMySubjects(teacherId, Role.TEACHER);
    }

    // Submit or update marks for students
    @Override
    public void submitMarks(MarksSubmitRequestDTO request) {

        Optional<Exams> examOpt = examsRepository.findByCourseNameAndSubjectName(
                request.getCourseName(),
                request.getSubjectName());

        if (examOpt.isEmpty()) {
            throw new RuntimeException("Exam not found");
        }

        Exams exam = examOpt.get();

        // Loop through marks entries
        for (MarksEntryDTO dto : request.getMarksList()) {

            // Validation checks
            if (dto.getStudentId() == null || dto.getObtainedMarks() == null)
                continue;

            if (dto.getObtainedMarks() < 0 || dto.getObtainedMarks() > 100)
                continue;

            User student = userRepository.findById(dto.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            // Fetch existing marks or create new
            Marks marks = marksRepository
                    .findByExamIdAndStudentId(exam.getId(), student.getId())
                    .orElse(new Marks());

            // Set marks details
            marks.setExam(exam);
            marks.setStudent(student);
            marks.setObtainedMarks(dto.getObtainedMarks());
            marks.setStatus(true);
            marks.setLastUpdated(LocalDateTime.now());

            marksRepository.save(marks);
        }
    }

    // Get student attendance list for teacher
    @Override
    public List<StudentAttendanceDTO> getStudentAttendanceList() {
        return userRepository.findStudentAttendanceListForTeacher();
    }

    
    
    /* ================= Teacher Attendance ================= */

    // Get logged-in teacher's attendance
    @Override
    public List<TeacherMyAttendanceDTO> getMyAttendance(Long teacherId) {
        return attendenceRepository.findMyAttendance(teacherId);
    }

    
    
    /* ================= Teacher Subjects ================= */

    // Get teacher schedule
    @Override
    public List<TeacherScheduleDTO> getTeacherSchedule(Long teacherId) {
        return enrollmentRepository.findTeacherSchedule(teacherId);
    }
    
    
    

    /* ================= Notices ================= */

    // Get all active notices for teacher
    @Override
    public List<NoticeResponse> getAllNoticesForTeacher() {

        List<Notice> notices = noticeRepository.findAllByTargetRoleInOrderByPublishDateDesc(
                List.of(Role.TEACHER, Role.ALL));

        List<NoticeResponse> responseList = new ArrayList<>();

        // Filter only active notices
        for (Notice notice : notices) {
            if (Boolean.TRUE.equals(notice.getStatus())) {
                responseList.add(
                        modelMapper.map(notice, NoticeResponse.class));
            }
        }
        return responseList;
    }
}

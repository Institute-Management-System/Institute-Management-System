package com.ims.service.impl;

import com.ims.dto.AdminFeeDTO;
import com.ims.dto.AdminStudentMarksDTO;
import com.ims.dto.AdminTeacherAttendanceDTO;
import com.ims.dto.AdminFeedbackDTO;
import com.ims.dto.AdminStudentAttendanceDTO;
import com.ims.dto.CourseDTO;
import com.ims.dto.StudentDTO;
import com.ims.dto.SubjectDTO;
import com.ims.entity.*;
import com.ims.exception.DuplicateRecordException;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.CourseRepository;
import com.ims.repository.EnrollmentRepository;
import com.ims.repository.ExamRepository;
import com.ims.repository.FeeRepository;
import com.ims.repository.FeedbackRepository;
import com.ims.repository.MarksRepository;
import com.ims.repository.NoticeRepository;
import com.ims.repository.SubjectRepository;
import com.ims.repository.UserRepository;
import com.ims.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- Student Operations ---

    @Override
    public User addStudent(StudentDTO studentDTO) {
        // Map DTO to User
        User user = modelMapper.map(studentDTO, User.class);

        // Set basic fields
        user.setFullName(studentDTO.getFirstName() + " " + studentDTO.getLastName());
        user.setAdmissionDate(studentDTO.getJoiningDate());

        // Handle Gender Enum
        try {
            if (studentDTO.getGender() != null) {
                user.setGender(GENDER.valueOf(studentDTO.getGender().toUpperCase()));
            }
        } catch (IllegalArgumentException e) {
            // Handle invalid gender string
            throw new RuntimeException("Invalid Gender value");
        }

        // Set Role
        user.setRole(Role.STUDENT);
        user.setDesignation("Student");
        // Generate Roll Number (Simple unique generation)
        user.setRollNumber("STU" + System.currentTimeMillis());

        // Generate Username (e.g., email or firstName + random)
        // For simplicity using email as username if not provided
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(studentDTO.getEmail());
        }

        // Set Password
        String rawPassword = studentDTO.getPassword();
        if (rawPassword == null || rawPassword.isEmpty()) {
            rawPassword = "password123"; // Default password
        }
        user.setPassword(passwordEncoder.encode(rawPassword));

        // Save User
        User savedUser = userRepository.save(user);

        // Handle Enrollment if Course is provided
        if (studentDTO.getCourseName() != null && !studentDTO.getCourseName().isEmpty()) {
            Course course = courseRepository.findByName(studentDTO.getCourseName());
            if (course != null) {
                // 1. Enroll in Course
                Enrollments enrollment = new Enrollments();
                enrollment.setUser(savedUser);
                enrollment.setCourse(course);
                enrollment.setRole(Role.STUDENT);
                enrollment.setAssignedDate(LocalDate.now());
                enrollment.setInactive(false);
                enrollmentRepository.save(enrollment);

                // 2. Enroll in ALL Subjects of the Course
                List<Subject> subjects = subjectRepository.findByCourseId(course.getId());
                for (Subject subject : subjects) {
                    Enrollments subjectEnrollment = new Enrollments();
                    subjectEnrollment.setUser(savedUser);
                    subjectEnrollment.setCourse(course);
                    subjectEnrollment.setSubject(subject);
                    subjectEnrollment.setRole(Role.STUDENT);
                    subjectEnrollment.setAssignedDate(LocalDate.now());
                    subjectEnrollment.setInactive(false);
                    enrollmentRepository.save(subjectEnrollment);
                }

                // Create Fee entry for the student
                Fee fee = new Fee();
                fee.setStudent(savedUser);
                fee.setCourse(course);
                fee.setAmount(course.getFees());
                fee.setStatus(FeeStatus.PENDING);
                fee.setInactive(false);
                feeRepository.save(fee);
            }
        }

        return savedUser;
    }

    @Override
    public User updateStudent(Long id, StudentDTO studentDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        // Update fields
        user.setFullName(studentDTO.getFirstName() + " " + studentDTO.getLastName());
        user.setEmail(studentDTO.getEmail());
        user.setPhone(studentDTO.getPhone());
        user.setAddress(studentDTO.getAddress());
        user.setDob(studentDTO.getDob());
        user.setAdmissionDate(studentDTO.getJoiningDate());
        user.setQualification(studentDTO.getQualification());
        user.setStatus(studentDTO.getStatus());

        if (studentDTO.getGender() != null) {
            user.setGender(GENDER.valueOf(studentDTO.getGender().toUpperCase()));
        }

        // Handle Course Update
        if (studentDTO.getCourseName() != null && !studentDTO.getCourseName().isEmpty()) {
            Course newCourse = courseRepository.findByName(studentDTO.getCourseName());
            if (newCourse != null) {
                // Check if already enrolled in this course (Primary Enrollment)
                List<Enrollments> existing = enrollmentRepository.findByUser(user);
                boolean enrolled = existing.stream().anyMatch(e -> e.getCourse() != null
                        && e.getCourse().getId().equals(newCourse.getId()) && e.getRole() == Role.STUDENT);

                if (!enrolled) {
                    // Enroll in new Course
                    Enrollments enrollment = new Enrollments();
                    enrollment.setUser(user);
                    enrollment.setCourse(newCourse);
                    enrollment.setRole(Role.STUDENT);
                    enrollment.setAssignedDate(LocalDate.now());
                    enrollment.setInactive(false);
                    enrollmentRepository.save(enrollment);

                    // Enroll in All Subjects
                    List<Subject> subjects = subjectRepository.findByCourseId(newCourse.getId());
                    for (Subject subject : subjects) {
                        Enrollments subjectEnrollment = new Enrollments();
                        subjectEnrollment.setUser(user);
                        subjectEnrollment.setCourse(newCourse);
                        subjectEnrollment.setSubject(subject);
                        subjectEnrollment.setRole(Role.STUDENT);
                        subjectEnrollment.setAssignedDate(LocalDate.now());
                        subjectEnrollment.setInactive(false);
                        enrollmentRepository.save(subjectEnrollment);
                    }
                }
            }
        }

        return userRepository.save(user);
    }

    @Override
    public void deleteStudent(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        // Soft delete: set status to false
        user.setStatus(false);
        userRepository.save(user);
    }

    @Override
    public List<User> getAllStudents() {
        return userRepository.findByRole(Role.STUDENT);
    }

    @Override
    public User getStudentById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    // student marks
    @Override
    public List<AdminStudentMarksDTO> getMarksByCourseAndSubject(Long courseId, Long subjectId) {
        // 1. Fetch the data from the repository
        List<Marks> marksList = marksRepository.findByCourseAndSubject(courseId, subjectId);

        // 2. Create an empty list to hold the response DTOs
        List<AdminStudentMarksDTO> responseList = new ArrayList<>();

        // 3. Iterate through the entity list using a for-each loop
        for (Marks mark : marksList) {
            AdminStudentMarksDTO dto = new AdminStudentMarksDTO();

            // Map Student details
            dto.setStudentId(mark.getStudent().getId());
            dto.setStudentName(mark.getStudent().getFullName());
            dto.setRollNumber(mark.getStudent().getRollNumber());
            dto.setObtainedMarks(mark.getObtainedMarks());

            // Map Exam details (with null check safety)
            if (mark.getExam() != null) {
                dto.setTotalMarks(mark.getExam().getTotalMarks());
                dto.setExamDate(mark.getExam().getExamDate().toString());

                // Calculate Status (Pass if marks >= 40%)
                // logic moved inside here to prevent NullPointerException
                boolean isPass = mark.getObtainedMarks() >= (mark.getExam().getTotalMarks() * 0.4);
                dto.setStatus(isPass ? "PASS" : "FAIL");
            } else {
                dto.setStatus("N/A"); // Handle missing exam data
            }

            // Add the populated DTO to the list
            responseList.add(dto);
        }

        // 4. Return the final list
        return responseList;
    }

    // --- Teacher Operations ---

    @Override
    public User addTeacher(StudentDTO teacherDTO) {
        // Reusing StudentDTO for teacher as requested/observed similar fields
        User user = modelMapper.map(teacherDTO, User.class);

        user.setFullName(teacherDTO.getFirstName() + " " + teacherDTO.getLastName());
        user.setAdmissionDate(teacherDTO.getJoiningDate());

        try {
            if (teacherDTO.getGender() != null) {
                user.setGender(GENDER.valueOf(teacherDTO.getGender().toUpperCase()));
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Gender value");
        }

        user.setRole(Role.TEACHER);
        user.setDesignation("Teacher");
        user.setRollNumber("TCH" + System.currentTimeMillis());

        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(teacherDTO.getEmail());
        }

        // Set Password
        String rawPassword = teacherDTO.getPassword();
        if (rawPassword == null || rawPassword.isEmpty()) {
            rawPassword = "password123";
        }
        user.setPassword(passwordEncoder.encode(rawPassword));

        User savedTeacher = userRepository.save(user);

        // Assign Subject if provided
        if (teacherDTO.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(teacherDTO.getSubjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));

            subject.setTeacher(savedTeacher);
            subjectRepository.save(subject);

            // Create Enrollment
            Enrollments enrollment = new Enrollments();
            enrollment.setUser(savedTeacher);
            enrollment.setCourse(subject.getCourse());
            enrollment.setSubject(subject);
            enrollment.setRole(Role.TEACHER);
            enrollment.setAssignedDate(LocalDate.now());
            enrollment.setInactive(false);
            enrollmentRepository.save(enrollment);
        }

        return savedTeacher;
    }

    @Override
    public User updateTeacher(Long id, StudentDTO teacherDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));

        user.setFullName(teacherDTO.getFirstName() + " " + teacherDTO.getLastName());
        user.setEmail(teacherDTO.getEmail());
        user.setPhone(teacherDTO.getPhone());
        user.setAddress(teacherDTO.getAddress());
        user.setDob(teacherDTO.getDob());
        user.setAdmissionDate(teacherDTO.getJoiningDate());
        user.setQualification(teacherDTO.getQualification());
        user.setStatus(teacherDTO.getStatus());

        if (teacherDTO.getGender() != null) {
            user.setGender(GENDER.valueOf(teacherDTO.getGender().toUpperCase()));
        }

        // Handle Subject Assignment during Update
        if (teacherDTO.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(teacherDTO.getSubjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));

            // Update Subject's teacher
            subject.setTeacher(user);
            subjectRepository.save(subject);

            // Check if enrollment exists, if not create it
            List<Enrollments> existing = enrollmentRepository.findByUser(user);
            boolean enrolled = existing.stream().anyMatch(e -> e.getSubject() != null
                    && e.getSubject().getId().equals(subject.getId()) && e.getRole() == Role.TEACHER);

            if (!enrolled) {
                Enrollments enrollment = new Enrollments();
                enrollment.setUser(user);
                enrollment.setCourse(subject.getCourse());
                enrollment.setSubject(subject);
                enrollment.setRole(Role.TEACHER);
                enrollment.setAssignedDate(LocalDate.now());
                enrollment.setInactive(false);
                enrollmentRepository.save(enrollment);
            }
        }

        return userRepository.save(user);
    }

    @Override
    public void deleteTeacher(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        // Soft Delete: set status to false
        user.setStatus(false);
        userRepository.save(user);
    }

    @Override
    public List<User> getAllTeachers() {
        return userRepository.findByRole(Role.TEACHER);
    }

    @Override
    public User getTeacherById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
    }

    // --- Course Operations ---

    @Override
    public Course addCourse(CourseDTO courseDTO) {
        // Check for duplicate course name
        Course existingCourse = courseRepository.findByName(courseDTO.getName());
        if (existingCourse != null) {
            throw new DuplicateRecordException("Course with same name already present");
        }
        Course course = modelMapper.map(courseDTO, Course.class);
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, CourseDTO courseDTO) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course.setName(courseDTO.getName());
        course.setDescription(courseDTO.getDescription());
        course.setDuration(courseDTO.getDuration());
        course.setMaxStudents(courseDTO.getMaxStudents());
        course.setFees(courseDTO.getFees());
        course.setStartDate(courseDTO.getStartDate());
        course.setEndDate(courseDTO.getEndDate());

        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        // Soft delete: set status to false (inactive)
        course.setStatus(false);
        courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    // --- Subject Operations ---

    @Override
    public Subject addSubject(SubjectDTO subjectDTO, MultipartFile scheduleFile) {
        Subject subject = modelMapper.map(subjectDTO, Subject.class);

        if (subjectDTO.getCourseId() != null) {
            Course course = courseRepository.findById(subjectDTO.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Course not found with id: " + subjectDTO.getCourseId()));

            // Check for duplicate subject in this course
            Subject existingSubject = subjectRepository.findByCourseIdAndName(course.getId(), subjectDTO.getName());
            if (existingSubject != null) {
                throw new DuplicateRecordException(
                        "Subject with same name present in a particular course");
            }

            subject.setCourse(course);
        } else if (subjectDTO.getCourseName() != null) {
            Course course = courseRepository.findByName(subjectDTO.getCourseName());
            if (course == null)
                throw new ResourceNotFoundException("Course not found with name: " + subjectDTO.getCourseName());

            // Check for duplicate subject in this course
            Subject existingSubject = subjectRepository.findByCourseIdAndName(course.getId(), subjectDTO.getName());
            if (existingSubject != null) {
                throw new DuplicateRecordException(
                        "Subject with same name present in a particular course");
            }

            subject.setCourse(course);
        } else {
            throw new RuntimeException("Course information is missing for Subject");
        }

        // Assign Teacher if provided
        if (subjectDTO.getTeacherId() != null) {
            User teacher = userRepository.findById(subjectDTO.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Teacher not found with id: " + subjectDTO.getTeacherId()));
            subject.setTeacher(teacher);
        }

        // Handle Schedule File Upload
        if (scheduleFile != null && !scheduleFile.isEmpty()) {
            try {
                String uploadDir = "uploads/schedules/";
                Files.createDirectories(
                        Paths.get(uploadDir));

                String fileName = UUID.randomUUID() + "_" + scheduleFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);

                Files.copy(
                        scheduleFile.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING);

                subject.setSchedulePath("/uploads/schedules/" + fileName);
            } catch (Exception e) {
                throw new RuntimeException("Schedule file upload failed to path "
                        + Paths.get("uploads/schedules/").toAbsolutePath() + ": " + e.getMessage());
            }
        }

        Subject savedSubject = subjectRepository.save(subject);

        // Create Enrollment for Teacher
        if (savedSubject.getTeacher() != null) {
            Enrollments enrollment = new Enrollments();
            enrollment.setUser(savedSubject.getTeacher());
            enrollment.setCourse(savedSubject.getCourse());
            enrollment.setSubject(savedSubject);
            enrollment.setRole(Role.TEACHER);
            enrollment.setAssignedDate(LocalDate.now());
            enrollment.setInactive(false);
            enrollmentRepository.save(enrollment);
        }

        return savedSubject;
    }

    @Override
    public Subject updateSubject(Long id, SubjectDTO subjectDTO, MultipartFile scheduleFile) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));

        subject.setName(subjectDTO.getName());

        if (subjectDTO.getDescription() != null)
            subject.setDescription(subjectDTO.getDescription());

        if (subjectDTO.getCourseId() != null) {
            Course course = courseRepository.findById(subjectDTO.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Course not found with id: " + subjectDTO.getCourseId()));
            subject.setCourse(course);
        } else if (subjectDTO.getCourseName() != null) {
            Course course = courseRepository.findByName(subjectDTO.getCourseName());
            if (course != null)
                subject.setCourse(course);
        }

        // Update Teacher if provided
        if (subjectDTO.getTeacherId() != null) {
            User teacher = userRepository.findById(subjectDTO.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Teacher not found with id: " + subjectDTO.getTeacherId()));

            // Check if teacher is changed
            if (subject.getTeacher() == null || !subject.getTeacher().getId().equals(teacher.getId())) {
                subject.setTeacher(teacher);

                // Ensure Enrollment exists for new teacher
                List<Enrollments> existing = enrollmentRepository.findByUser(teacher);
                boolean enrolled = existing.stream().anyMatch(e -> e.getSubject() != null
                        && e.getSubject().getId().equals(subject.getId()) && e.getRole() == Role.TEACHER);

                if (!enrolled) {
                    Enrollments enrollment = new Enrollments();
                    enrollment.setUser(teacher);
                    enrollment.setCourse(subject.getCourse());
                    enrollment.setSubject(subject);
                    enrollment.setRole(Role.TEACHER);
                    enrollment.setAssignedDate(LocalDate.now());
                    enrollment.setInactive(false);
                    enrollmentRepository.save(enrollment);
                }
            }
        }

        // Handle Schedule File Update
        if (scheduleFile != null && !scheduleFile.isEmpty()) {
            try {
                String uploadDir = "uploads/schedules/";
                Files.createDirectories(
                        Paths.get(uploadDir));

                String fileName = UUID.randomUUID() + "_" + scheduleFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);

                Files.copy(
                        scheduleFile.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING);

                // Ideally delete old file here if it exists, but skipped for simplicity
                subject.setSchedulePath("/uploads/schedules/" + fileName);
            } catch (Exception e) {
                throw new RuntimeException("Schedule file update failed: " + e.getMessage());
            }
        }

        return subjectRepository.save(subject);
    }

    @Override
    public void deleteSubject(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));

        // Soft delete: set status to false
        subject.setStatus(false);
        subjectRepository.save(subject);
    }

    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public List<Subject> getSubjectsByCourseId(Long courseId) {
        return subjectRepository.findByCourseId(courseId);
    }

    @Override
    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
    }

    // --- Notice Operations ---

    @Autowired
    private NoticeRepository noticeRepository;

    @Override
    public Notice addNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll(Sort
                .by(Sort.Direction.DESC, "publishDate"));
    }

    @Override
    public void deleteNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice not found with id: " + id));
        // Soft delete: toggle status
        if (notice.getStatus() == null) {
            notice.setStatus(true);
        } else {
            notice.setStatus(!notice.getStatus());
        }
        noticeRepository.save(notice);
    }

    // --- Fee Operations ---

    @Override
    public List<AdminFeeDTO> getAllStudentFees() {
        // Sync: Ensure every student with a course has a fee record
        List<User> students = userRepository.findByRole(Role.STUDENT);

        for (User student : students) {
            // Check if student has a fee record
            List<Fee> existingFees = feeRepository.findByStudentId(student.getId());

            if (existingFees.isEmpty()) {
                // Check if student is enrolled in a course (using Enrollment Logic)
                // We can either query enrollment repo or if we established that user -> course
                // is via enrollment
                // Let's use enrollment repo
                List<Enrollments> enrollments = enrollmentRepository.findByUser(student);

                // Find the primary course enrollment
                Enrollments courseEnrollment = enrollments.stream()
                        .filter(e -> e.getCourse() != null && e.getRole() == Role.STUDENT)
                        .findFirst().orElse(null);

                if (courseEnrollment != null && courseEnrollment.getCourse() != null) {
                    // Create missing fee record
                    Fee newFee = new Fee();
                    newFee.setStudent(student);
                    newFee.setCourse(courseEnrollment.getCourse());
                    newFee.setAmount(courseEnrollment.getCourse().getFees());
                    newFee.setStatus(FeeStatus.PENDING);
                    newFee.setInactive(false);
                    feeRepository.save(newFee);
                }
            }
        }

        // Now fetch all fees
        List<Fee> fees = feeRepository.findAll();
        List<AdminFeeDTO> feeDTOs = new ArrayList<>();

        for (Fee fee : fees) {
            AdminFeeDTO dto = new AdminFeeDTO();
            dto.setId(fee.getId());
            if (fee.getStudent() != null) {
                dto.setStudentId(fee.getStudent().getId());
                dto.setStudentName(fee.getStudent().getFullName());
                dto.setEmail(fee.getStudent().getEmail());
                dto.setPhone(fee.getStudent().getPhone());
            }
            if (fee.getCourse() != null) {
                dto.setCourseName(fee.getCourse().getName());
            }
            dto.setAmount(fee.getAmount());
            dto.setStatus(fee.getStatus().toString());
            dto.setPaymentDate(fee.getPaymentDate());
            feeDTOs.add(dto);
        }
        return feeDTOs;
    }

    @Override
    public AdminFeeDTO updateFeeStatus(Long feeId, String status) {
        Fee fee = feeRepository.findById(feeId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee record not found with id: " + feeId));

        if (fee.getStatus() == FeeStatus.PAID) {
            throw new RuntimeException("Fee is already PAID and cannot be changed to PENDING");
        }

        try {
            fee.setStatus(FeeStatus.valueOf(status.toUpperCase()));
            if (FeeStatus.PAID.name().equalsIgnoreCase(status)) {
                fee.setPaymentDate(LocalDate.now());
            } else {
                fee.setPaymentDate(null);
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Fee Status");
        }

        Fee savedFee = feeRepository.save(fee);

        // Return updated DTO
        AdminFeeDTO dto = new AdminFeeDTO();
        dto.setId(savedFee.getId());
        dto.setAmount(savedFee.getAmount());
        dto.setStatus(savedFee.getStatus().toString());
        dto.setPaymentDate(savedFee.getPaymentDate());
        return dto;
    }

    // --- Feedback Operations ---

    @Override
    public List<AdminFeedbackDTO> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAllByOrderByFeedbackDateDesc();
        List<AdminFeedbackDTO> feedbackDTOs = new ArrayList<>();

        for (Feedback feedback : feedbacks) {
            AdminFeedbackDTO dto = new AdminFeedbackDTO();
            dto.setId(feedback.getId());
            if (feedback.getUser() != null) {
                dto.setStudentId(feedback.getUser().getId());
                dto.setStudentName(feedback.getUser().getFullName());
            }
            if (feedback.getCourse() != null) {
                dto.setCourseName(feedback.getCourse().getName());
            }
            if (feedback.getSubject() != null) {
                dto.setSubjectName(feedback.getSubject().getName());
            }
            dto.setFeedbackText(feedback.getFeedbackText());
            dto.setFeedbackDate(feedback.getFeedbackDate());
            dto.setRating(feedback.getRating());
            dto.setResponseText(feedback.getResponseText());
            dto.setRespondedAt(feedback.getRespondedAt());

            feedbackDTOs.add(dto);
        }
        return feedbackDTOs;
    }

    @Override
    public AdminFeedbackDTO respondToFeedback(Long feedbackId, String response) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + feedbackId));

        feedback.setResponseText(response);
        feedback.setRespondedAt(LocalDateTime.now());

        Feedback savedFeedback = feedbackRepository.save(feedback);

        // Return updated DTO
        AdminFeedbackDTO dto = new AdminFeedbackDTO();
        dto.setId(savedFeedback.getId());
        dto.setResponseText(savedFeedback.getResponseText());
        dto.setRespondedAt(savedFeedback.getRespondedAt());
        return dto;
    }

    // --- Attendance Operations ---

    @Override
    public List<AdminStudentAttendanceDTO> getStudentAttendanceList() {
        return userRepository.findStudentAttendanceList();
    }

    @Override
    public List<AdminTeacherAttendanceDTO> getTeacherAttendanceList() {
        return userRepository.findTeacherAttendanceList();
    }

    @Override
    public User toggleUserStatus(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus(!user.getStatus());
        return userRepository.save(user);
    }

    @Override
    public Course toggleCourseStatus(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        course.setStatus(!course.getStatus());
        return courseRepository.save(course);
    }

    @Override
    public Subject toggleSubjectStatus(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        subject.setStatus(!subject.getStatus());
        return subjectRepository.save(subject);
    }

    @Override
    public int saveUsers(MultipartFile file) {
        int count = 0;
        try {
            List<User> users = com.ims.helper.CSVHelper.csvToUsers(file.getInputStream());
            System.out.println("CSV Upload: Parsed " + users.size() + " users.");
            for (User user : users) {
                java.util.Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());
                if (existingUserOpt.isEmpty()) {
                    // Create New User
                    // Encode password
                    user.setPassword(passwordEncoder.encode(user.getPassword()));

                    // Set additional defaults
                    if (user.getRole() == Role.STUDENT) {
                        user.setRollNumber("STU" + System.currentTimeMillis());
                        user.setDesignation("Student");
                    } else if (user.getRole() == Role.TEACHER) {
                        user.setRollNumber("TCH" + System.currentTimeMillis());
                        user.setDesignation("Teacher");
                    }
                    user.setUsername(user.getEmail());
                    user.setAdmissionDate(LocalDate.now());

                    // Set default mandatory fields not present in CSV
                    user.setAddress("Not Provided");
                    user.setQualification("N/A");
                    user.setDob(LocalDate.of(2000, 1, 1)); // Default DOB

                    userRepository.save(user);
                    count++;
                } else {
                    // Update Existing User
                    User existingUser = existingUserOpt.get();
                    System.out.println("CSV Upload: Updating existing user " + user.getEmail());

                    existingUser.setFullName(user.getFullName());
                    existingUser.setPhone(user.getPhone());
                    existingUser.setPassword(passwordEncoder.encode(user.getPassword()));

                    // Handle Role Change
                    if (existingUser.getRole() != user.getRole()) {
                        existingUser.setRole(user.getRole());
                        // Update Designation and Roll Number prefix if needed
                        if (user.getRole() == Role.STUDENT) {
                            existingUser.setDesignation("Student");
                            if (!existingUser.getRollNumber().startsWith("STU")) {
                                existingUser.setRollNumber("STU" + System.currentTimeMillis());
                            }
                        } else if (user.getRole() == Role.TEACHER) {
                            existingUser.setDesignation("Teacher");
                            if (!existingUser.getRollNumber().startsWith("TCH")) {
                                existingUser.setRollNumber("TCH" + System.currentTimeMillis());
                            }
                        }
                    }

                    userRepository.save(existingUser);
                    count++;
                }
            }
        } catch (java.io.IOException e) {
            e.printStackTrace();
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
        System.out.println("CSV Upload: Total saved users: " + count);
        return count;
    }

}

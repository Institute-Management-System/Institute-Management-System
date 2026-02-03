package com.ims.repository;

import com.ims.dto.EnrolledSubjectResponse;
import com.ims.dto.MySubjectDTO;
import com.ims.dto.StudentMarksViewDTO;
import com.ims.dto.SubjectTimeTableResponse;
import com.ims.dto.TeacherScheduleDTO;
import com.ims.entity.Enrollments;
import com.ims.entity.Role;
import com.ims.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollments, Long> {
    List<Enrollments> findByUser(User user);

    @Query("""
                SELECT new com.ims.dto.MySubjectDTO(
                    MAX(e.id),
                    c.name,
                    MAX(e.assignedDate),
                    s.name,
                    c.id,
                    s.id,
                    s.schedulePath
                )
                FROM Enrollments e
                JOIN e.course c
                JOIN e.subject s
                WHERE e.user.id = :teacherId AND e.role = :role
                GROUP BY c.id, s.id, c.name, s.name, s.schedulePath
            """)
    List<MySubjectDTO> findMySubjects(Long teacherId, Role role);

    @Query("""
                SELECT DISTINCT new com.ims.dto.StudentMarksViewDTO(
                    u.id,
                    u.rollNumber,
                    u.fullName,
                    m.obtainedMarks,
                    CASE
                        WHEN m.obtainedMarks IS NULL THEN '-'
                        WHEN m.obtainedMarks >= 40 THEN 'PASS'
                        ELSE 'FAIL'
                    END
                )
                FROM User u
                JOIN Enrollments e ON e.user.id = u.id
                LEFT JOIN Marks m
                    ON m.student.id = u.id
                   AND m.exam.id = :examId
                WHERE e.course.id = :courseId
                  AND e.role = :role
                  AND e.inactive = false
                ORDER BY u.rollNumber
            """)
    List<StudentMarksViewDTO> findStudentsForMarks(
            @Param("courseId") Long courseId,
            @Param("subjectId") Long subjectId,
            @Param("examId") Long examId,
            @Param("role") Role role);

    @Query("""
                SELECT new com.ims.dto.TeacherScheduleDTO(
                    s.id,
                    c.name,
                    s.name,
                    s.schedulePath
                )
                FROM Enrollments e
                JOIN e.subject s
                JOIN e.course c
                WHERE e.user.id = :teacherId
                  AND e.role = com.ims.entity.Role.TEACHER
                  AND e.inactive = false
            """)
    List<TeacherScheduleDTO> findTeacherSchedule(@Param("teacherId") Long teacherId);

    // ================= STUDENT QUERIES =================

    @Query("""
                SELECT COUNT(DISTINCT e.course.id)
                FROM Enrollments e
                WHERE e.user.id = :userId
                AND e.role = 'STUDENT'
            """)
    Long countCoursesByUserId(@Param("userId") Long userId);

    @Query("""
                SELECT COUNT(DISTINCT e.subject.id)
                FROM Enrollments e
                WHERE e.user.id = :userId
                AND e.role = 'STUDENT'
            """)
    Long countSubjectsByUserId(@Param("userId") Long userId);

    @Query("""
                SELECT new com.ims.dto.EnrolledSubjectResponse(
                    MAX(e.id),
                    c.name,
                    MAX(e.assignedDate),
                    s.name,
                    s.schedulePath
                )
                FROM Enrollments e
                JOIN e.course c
                JOIN e.subject s
                WHERE e.user.id = :userId
                AND e.role = 'STUDENT'
                GROUP BY c.id, s.id, c.name, s.name, s.schedulePath
            """)
    List<EnrolledSubjectResponse> findEnrolledSubjectsByUserId(@Param("userId") Long userId);

    @Query("""
                SELECT new com.ims.dto.SubjectTimeTableResponse(
                    s.id,
                    c.name,
                    s.name,
                    s.duration,
                    s.schedulePath
                )
                FROM Enrollments e
                JOIN e.course c
                JOIN e.subject s
                WHERE e.user.id = :userId
                AND e.role = 'STUDENT'
            """)
    List<SubjectTimeTableResponse> findSubjectsTimeTableByUserId(@Param("userId") Long userId);

    void deleteByCourseId(Long courseId);

    void deleteBySubjectId(Long subjectId);

    @Query("SELECT COUNT(DISTINCT e.user.id) FROM Enrollments e WHERE e.role = 'STUDENT' AND e.subject.teacher.id = :teacherId AND e.inactive = false")
    Long countStudentsByTeacherId(@Param("teacherId") Long teacherId);
}

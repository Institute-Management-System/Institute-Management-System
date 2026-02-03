package com.ims.repository;

import com.ims.entity.User;
import com.ims.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import com.ims.dto.AdminStudentAttendanceDTO;
import com.ims.dto.AdminTeacherAttendanceDTO;
import com.ims.dto.StudentAttendanceDTO;
import com.ims.dto.StudentListDTO;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    long countByRoleAndStatus(Role role, Boolean status);

    Optional<User> findByIdAndRole(Long id, Role role);

    @Query("""
                SELECT DISTINCT new com.ims.dto.StudentListDTO(
                    u.rollNumber,
                    u.fullName,
                    u.email,
                    u.phone,
                    CAST(u.Gender AS string),
                    e.course.name,
                    u.admissionDate
                )
                FROM Enrollments e
                JOIN e.user u
                WHERE u.role = :role
                ORDER BY u.rollNumber
            """)
    List<StudentListDTO> findStudentListDTOByRole(Role role);

    @Query("""
                SELECT new com.ims.dto.StudentAttendanceDTO(
                    u.rollNumber,
                    u.fullName,
                    c.name,
                    ROUND(
                        (SUM(CASE WHEN a.status = com.ims.entity.Status.PRESENT THEN 1 ELSE 0 END) * 100.0)
                        / NULLIF(COUNT(a.id), 0),
                    2)
                )
                FROM Enrollments e
                JOIN e.user u
                JOIN e.course c
                LEFT JOIN Attendence a ON a.user = u AND a.course = c
                WHERE u.role = com.ims.entity.Role.STUDENT
                GROUP BY u.id, u.rollNumber, u.fullName, c.name
                ORDER BY u.rollNumber
            """)
    List<StudentAttendanceDTO> findStudentAttendanceListForTeacher();

    @Query("""
                SELECT new com.ims.dto.AdminStudentAttendanceDTO(
                    u.rollNumber,
                    u.fullName,
                    c.name,
                    ROUND(
                        (SUM(CASE WHEN a.status = com.ims.entity.Status.PRESENT THEN 1 ELSE 0 END) * 100.0)
                        / NULLIF(COUNT(a.id), 0),
                    2)
                )
                FROM Enrollments e
                JOIN e.user u
                JOIN e.course c
                LEFT JOIN Attendence a ON a.user = u AND a.course = c
                WHERE u.role = com.ims.entity.Role.STUDENT
                GROUP BY u.id, u.rollNumber, u.fullName, c.name
                ORDER BY u.rollNumber
            """)
    List<AdminStudentAttendanceDTO> findStudentAttendanceList();

    @Query("""
                SELECT new com.ims.dto.AdminTeacherAttendanceDTO(
                    u.id,
                    u.fullName,
                    ROUND(
                        (SUM(CASE WHEN a.status = com.ims.entity.Status.PRESENT THEN 1 ELSE 0 END) * 100.0)
                        / NULLIF(COUNT(a.id), 0),
                    2)
                )
                FROM User u
                LEFT JOIN Attendence a ON a.user = u
                WHERE u.role = com.ims.entity.Role.TEACHER
                GROUP BY u.id, u.fullName
                ORDER BY u.fullName
            """)
    List<AdminTeacherAttendanceDTO> findTeacherAttendanceList();

    Optional<User> findByEmail(String email);
}

package com.ims.repository;

import com.ims.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByName(String name);

    @org.springframework.data.jpa.repository.Query("""
                SELECT DISTINCT new com.ims.dto.CourseResponse(
                    e.course.id,
                    e.course.name
                )
                FROM Enrollments e
                WHERE e.user.id = :studentId
                  AND e.role = 'STUDENT'
                  AND e.inactive = false
                  AND e.course.status = true
            """)
    java.util.List<com.ims.dto.CourseResponse> findDistinctCoursesByStudent(
            @org.springframework.data.repository.query.Param("studentId") Long studentId);
}

package com.ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ims.dto.SubjectResponse;
import com.ims.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByCourseId(Long courseId);

    @Query("""
                SELECT DISTINCT new com.ims.dto.SubjectResponse(
                    e.subject.id,
                    e.subject.name
                )
                FROM Enrollments e
                WHERE e.user.id = :studentId
                  AND e.course.id = :courseId
                  AND e.role = 'STUDENT'
                  AND e.inactive = false
            """)
    List<SubjectResponse> findSubjectsByStudentAndCourse(
            @Param("studentId") Long studentId,
            @Param("courseId") Long courseId);

    void deleteByCourseId(Long courseId);

    Subject findByCourseIdAndName(Long courseId, String name);

    Long countByTeacherId(Long teacherId);
}

package com.ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ims.dto.SubjectMarksResponse;
import com.ims.entity.Marks;

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {

    @Query("SELECT m FROM Marks m WHERE m.exam.id = :examId AND m.student.id = :studentId")
    java.util.Optional<Marks> findByExamIdAndStudentId(@Param("examId") Long examId,
            @Param("studentId") Long studentId);

    @Query("""
                SELECT new com.ims.dto.SubjectMarksResponse(
                    m.id,
                    e.course.name,
                    e.subject.name,
                    m.obtainedMarks,
                    e.totalMarks
                )
                FROM Marks m
                JOIN m.exam e
                WHERE m.student.id = :userId
            """)
    List<SubjectMarksResponse> findSubjectMarksByUserId(@Param("userId") Long userId);

    @Query("SELECT m FROM Marks m WHERE m.exam.course.id = :courseId AND m.exam.subject.id = :subjectId")
    List<Marks> findByCourseAndSubject(@Param("courseId") Long courseId, @Param("subjectId") Long subjectId);

    void deleteByExamCourseId(Long courseId);

    void deleteByExamSubjectId(Long subjectId);
}

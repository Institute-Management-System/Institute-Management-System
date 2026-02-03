package com.ims.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Exams;

public interface ExamRepository extends JpaRepository<Exams, Long> {

    // ==================Teacher Evaluate Student =========================

	    Optional<Exams> findByCourseNameAndSubjectName(String courseName, String subjectName);

    // ==================== Exam Portal ================================
    List<Exams> findByCourse_Name(String courseName);

    // Find exams for specific subjects (for Teacher view)
    List<Exams> findBySubject_IdIn(List<Long> subjectIds);

    java.util.List<Exams> findByCourseId(Long courseId);

    void deleteByCourseId(Long courseId);

    void deleteBySubjectId(Long subjectId);
}

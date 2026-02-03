package com.ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ims.entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findAllByOrderByFeedbackDateDesc();

    List<Feedback> findByUserIdOrderByCreatedOnDesc(Long id);

    void deleteByCourseId(Long courseId);

    void deleteBySubjectId(Long subjectId);
}

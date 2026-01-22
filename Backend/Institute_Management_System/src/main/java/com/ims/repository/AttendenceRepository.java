package com.ims.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Attendence;
import com.ims.entity.Status;

public interface AttendenceRepository extends JpaRepository<Attendence, Long>{
	
	  // List table detail
    List<Attendence> findByUserIdAndAttendanceDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Total lectures
    long countByUserIdAndCourseIdAndAttendanceDateBetween(
            Long userId,
            Long courseId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Present and absent count
    long countByUserIdAndCourseIdAndStatusAndAttendanceDateBetween(
            Long userId,
            Long courseId,
            Status status,
            LocalDate startDate,
            LocalDate endDate
    );

}

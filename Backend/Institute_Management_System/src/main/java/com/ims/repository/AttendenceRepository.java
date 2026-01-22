package com.ims.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ims.dto.AttendanceTableResponse;
import com.ims.entity.Attendence;
import com.ims.entity.Status;

public interface AttendenceRepository extends JpaRepository<Attendence, Long>{
	
	 @Query("""
		        SELECT new com.ims.dto.AttendanceTableResponse(
		            a.attendanceDate,
		            a.status,
		            a.subject.name
		        )
		        FROM Attendence a
		        WHERE a.user.id = :userId
		        AND a.attendanceDate BETWEEN :startDate AND :endDate
		        ORDER BY a.attendanceDate DESC
		    """)

     List<AttendanceTableResponse> findAttendanceTableData(
		            @Param("userId") Long userId,
		            @Param("startDate") LocalDate startDate,
		            @Param("endDate") LocalDate endDate
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

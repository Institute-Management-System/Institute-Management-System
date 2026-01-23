package com.ims.service.impl;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ims.dto.AttendanceSummaryResponse;
import com.ims.dto.AttendanceTableResponse;
import com.ims.entity.Attendence;
import com.ims.entity.Status;
import com.ims.repository.AttendenceRepository;
import com.ims.service.StudentService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

	 private final AttendenceRepository attendenceRepository;

	    //COMMON CALCULATION LOGIC
	    private AttendanceSummaryResponse calculateAttendance(
	            Long userId,
	            Long courseId,
	            LocalDate startDate,
	            LocalDate endDate
	    ) {
	        long total = attendenceRepository
	                .countByUserIdAndCourseIdAndAttendanceDateBetween(
	                        userId, courseId, startDate, endDate);

	        long present = attendenceRepository
	                .countByUserIdAndCourseIdAndStatusAndAttendanceDateBetween(
	                        userId, courseId, Status.PRESENT, startDate, endDate);

	        long absent = attendenceRepository
	                .countByUserIdAndCourseIdAndStatusAndAttendanceDateBetween(
	                        userId, courseId, Status.ABSENT, startDate, endDate);

	        double percentage = total == 0 ? 0.0 : (present * 100.0) / total;

	        return new AttendanceSummaryResponse(
	                total,
	                present,
	                absent,
	                percentage
	        );
	    }

	    //MONTHLY ATTENDANCE
	    @Override
	    public AttendanceSummaryResponse getMonthlyAttendance(
	            Long userId,
	            Long courseId,
	            YearMonth month
	    ) {
	        return calculateAttendance(
	                userId,
	                courseId,
	                month.atDay(1),
	                month.atEndOfMonth()
	        );
	    }
	  
	    //OVERALL ATTENDANCE
	    @Override
	    public AttendanceSummaryResponse getOverallAttendance(
	            Long userId,
	            Long courseId
	    ) {
	        return calculateAttendance(
	                userId,
	                courseId,
	                LocalDate.of(2000, 1, 1),
	                LocalDate.now()
	        );
	    }
 
	    //ATTENDANCE TABLE DATA
	    @Override
	    public List<AttendanceTableResponse> getAttendanceTable(
	            Long userId,
	            LocalDate startDate,
	            LocalDate endDate
	    ) {
	        return attendenceRepository.findAttendanceTableData(
	                userId, startDate, endDate);
	    }
}
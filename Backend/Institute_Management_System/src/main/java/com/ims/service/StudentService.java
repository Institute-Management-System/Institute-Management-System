package com.ims.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import com.ims.dto.AttendanceSummaryResponse;
import com.ims.dto.AttendanceTableResponse;
import com.ims.entity.Attendence;

public interface StudentService {
	  AttendanceSummaryResponse getMonthlyAttendance(
	            Long userId,
	            Long courseId,
	            YearMonth month
	    );

	    AttendanceSummaryResponse getOverallAttendance(
	            Long userId,
	            Long courseId
	    );

	    List<AttendanceTableResponse> getAttendanceTable(
	            Long userId,
	            LocalDate startDate,
	            LocalDate endDate
	    );
}
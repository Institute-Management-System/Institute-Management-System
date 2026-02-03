package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceSummaryDTO {
    private Long presentStudents;
    private Long totalActiveStudents;
    private Double attendancePercentage;
}

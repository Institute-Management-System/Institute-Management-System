package com.ims.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceSummaryResponse {
    private long totalLectures;
    private long presentCount;
    private long absentCount;
    private double attendancePercentage;
}

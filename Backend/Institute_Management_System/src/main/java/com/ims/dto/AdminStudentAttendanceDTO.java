package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminStudentAttendanceDTO {
    private String rollNumber;
    private String fullName;
    private String courseName;
    private Double attendancePercentage;
}

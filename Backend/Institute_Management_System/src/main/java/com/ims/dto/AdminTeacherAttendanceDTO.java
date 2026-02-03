package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminTeacherAttendanceDTO {
    private Long id;
    private String fullName;
    private Double attendancePercentage;
}

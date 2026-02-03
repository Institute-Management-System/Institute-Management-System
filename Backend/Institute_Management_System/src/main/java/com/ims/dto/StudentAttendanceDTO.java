package com.ims.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAttendanceDTO {

    private String rollNumber;
    private String studentName;
    private String courseName;
    private Double overallPercent;
}

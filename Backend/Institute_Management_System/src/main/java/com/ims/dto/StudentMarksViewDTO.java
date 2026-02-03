package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StudentMarksViewDTO {

    private Long studentId;
    private String rollNumber;
    private String studentName;
    private Integer obtainedMarks;
    private String status; // PASS / FAIL / -
}

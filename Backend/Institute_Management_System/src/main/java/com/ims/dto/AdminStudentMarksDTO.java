package com.ims.dto;

import lombok.Data;

@Data
public class AdminStudentMarksDTO {
    private Long studentId;
    private String studentName;
    private String rollNumber;
    private int obtainedMarks;
    private int totalMarks;
    private String examDate;
    private String status; // Pass/Fail or Present/Absent
}

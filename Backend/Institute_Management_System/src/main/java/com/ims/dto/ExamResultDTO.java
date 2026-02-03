package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamResultDTO {
    private Long studentId;
    private String studentName;
    private String rollNumber;
    private Integer obtainedMarks;
    private String status;
}

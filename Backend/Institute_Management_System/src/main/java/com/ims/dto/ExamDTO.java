package com.ims.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private Long id;
    private String examName;
    private LocalDate examDate;
    private Integer totalMarks;
    private Boolean status;
    private String examLink;
    private Long courseId;
    private Long subjectId;
    private String courseName;
    private String subjectName;
    private Integer obtainedMarks;
}

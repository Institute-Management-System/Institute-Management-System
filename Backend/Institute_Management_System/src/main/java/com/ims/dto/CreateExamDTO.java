package com.ims.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CreateExamDTO {
    private String examName;
    private Long courseId;
    private Long subjectId;
    private LocalDate examDate;
    private Integer totalMarks;
    private String examLink;
}

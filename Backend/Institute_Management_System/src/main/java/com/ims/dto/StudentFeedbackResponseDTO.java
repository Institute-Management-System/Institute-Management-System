package com.ims.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentFeedbackResponseDTO {

    private Long feedbackId;
    private String feedbackText;
    private Integer rating;

    private LocalDate feedbackDate;

    // Admin response
    private String responseText;
    private LocalDateTime respondedAt;

    // Course & Subject
    private Long courseId;
    private String courseName;

    private Long subjectId;
    private String subjectName;
}

package com.ims.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AdminFeedbackDTO {
    private Long id;
    private Long studentId;
    private String studentName;
    private String courseName;
    private String subjectName;
    private String feedbackText;
    private LocalDate feedbackDate;
    private int rating;
    private String responseText;
    private LocalDateTime respondedAt;
}

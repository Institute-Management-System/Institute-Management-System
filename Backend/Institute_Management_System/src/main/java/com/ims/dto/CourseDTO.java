package com.ims.dto;

import lombok.Data;

@Data
public class CourseDTO {
    private Long id;
    private String name;
    private String description;
    private String duration; // e.g., "6 Months"
    private Integer maxStudents;
    private Double fees;
    private java.time.LocalDate startDate;
    private java.time.LocalDate endDate;
    private Boolean status;
}

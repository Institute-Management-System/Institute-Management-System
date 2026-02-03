package com.ims.dto;

import lombok.Data;

@Data
public class SubjectDTO {
    private Long id;
    private String name;
    private String description;
    private Long courseId;
    private String courseName;
    private Long teacherId;
    private String teacherName;
    private String schedulePath;
    private Boolean status;
}

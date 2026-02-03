package com.ims.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CourseResponse {

    private Long courseId;
    private String courseName;

    // 🔥 REQUIRED BY JPQL
    public CourseResponse(Long courseId, String courseName) {
        this.courseId = courseId;
        this.courseName = courseName;
    }

    public Long getCourseId() {
        return courseId;
    }

    public String getCourseName() {
        return courseName;
    }
}

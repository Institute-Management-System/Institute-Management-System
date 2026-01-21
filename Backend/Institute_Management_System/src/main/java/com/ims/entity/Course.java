package com.ims.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
@AttributeOverride(
    name = "id",
    column = @Column(name = "course_id")
)
public class Course extends BaseEntity {

    private String name;

    @Column(name = "duration_months")
    private Integer durationMonths;

    private String description;

    @Column(name = "timetable_path")
    private String timetablePath;
}


package com.ims.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@Entity
@Table(name = "courses")
@AttributeOverride(name = "id", column = @Column(name = "course_id"))
public class Course extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "duration")
    private String duration;

    @Column(name = "max_students")
    private Integer maxStudents;

    @Column(name = "fees")
    private Double fees;

    @Column(name = "start_date")
    private java.time.LocalDate startDate;

    @Column(name = "end_date")
    private java.time.LocalDate endDate;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "Active")
    private Boolean status = false;
}

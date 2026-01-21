package com.ims.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name = "attendance_id"))

@Entity
@Table(name = "attendance")
public class Attendence extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;
    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
}
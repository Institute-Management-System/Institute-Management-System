package com.ims.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

//lombok annotation
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name = "feedback_id"))

@Entity
@Table(name = "feedback")
public class Feedback extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    @NotNull
    @Column(name = "feedback_text", nullable = false, length = 500)
    private String feedbackText;
    @Column(name = "feedback_date")
    private LocalDate feedbackDate;
    @NotNull
    @Min(1) 
    @Max(5)
    @Column(nullable = false)
    private int rating;
    @Column(name = "response_text", length = 500)
    private String responseText;
    @Column(name = "responded_at")
    private LocalDateTime respondedAt;
    @Column(name = "is_inactive")
    private Boolean isInactive = false;
}


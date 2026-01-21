package com.ims.entity;

import com.ims.entity.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "enrollments")
public class Enrollments {
    
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	@ManyToOne
	@JoinColumn(name = "subject_id")
	private Subject subject;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Column(name = "assigned_date")
	private LocalDate assignedDate;

	@Column(name = "is_inactive")
	private Boolean inactive = false;
}


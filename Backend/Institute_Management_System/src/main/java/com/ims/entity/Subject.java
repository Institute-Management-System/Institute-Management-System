package com.ims.entity;

import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

//Lombok Annotations
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "subject_id"))

// JPA Annotations
@Entity
@Table(name = "subjects")
public class Subject extends BaseEntity {

	@Column(name = "name", nullable = false, length = 100)
	private String name;

	@Column(name = "description", length = 500)
	private String description;

	@Column(name = "duration", length = 500)
	private String duration;

	@ManyToOne
	@JoinColumn(name = "course_id", nullable = false)
	private Course course;

	@ManyToOne
	@JoinColumn(name = "teacher_id") // Optional, as a subject might not have a teacher initially? User said "during
										// addition", so maybe mandatory? Let's make it optional for safety unless
										// required.
	private User teacher;

	@Column(name = "schedule_path")
	private String schedulePath;

	@Column(name = "Active")
	private Boolean status = false;
}

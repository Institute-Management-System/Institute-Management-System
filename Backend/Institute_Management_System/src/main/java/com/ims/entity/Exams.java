package com.ims.entity;

import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//Lonbok Annotations
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)

// JPA Annotations
@Entity
@Table(name = "exams")
@AttributeOverride(name = "id", column = @Column(name = "exam_id"))
public class Exams extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;

	@ManyToOne
	@JoinColumn(name = "subject_id")
	private Subject subject;

	@Column(name = "exam_date")
	private LocalDate examDate;

	@Column(name = "total_marks")
	private int totalMarks;

	@Column(name = "status")
	private Boolean status = true;

	@Column(name = "exam_name", length = 100)
	private String examName;

	@Column(name = "exam_link", length = 500)
	private String examLink;
}

package com.ims.entity;

import java.time.LocalDateTime;

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

//Lombok Annotations
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)


//JPA Annotations
@Entity
@Table(name = "marks")
@AttributeOverride(name="id",column = @Column(name="mark_id") )
public class Marks extends BaseEntity{
	
	@ManyToOne
	@JoinColumn(name="exam_id")
	private Exams exam;
	
	@ManyToOne
	@JoinColumn(name = "student_id")
	private User user;
	
	@Column(name="obtained_marks")
	private int obtainedMarks;
	
	@Column(name="status")
	private Boolean status = false;
}


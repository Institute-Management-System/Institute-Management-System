package com.ims.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//Lombok Annotations
@Getter
@Setter
@AttributeOverride(name="id",column = @Column(name="subject_id"))

//JPA Annotations
@Entity
@Table(name="subjects")
public class Subject {
		
	@Column(name = "name", nullable = false, length = 100)
	private String name;
	
	@Column(name="description", length=500)
	private String description;
	
	// Many subjects belong to one course
	//@ManyToMany(fetch = FetchType.LAZY)
        //@JoinColumn(name="course_id") // FK column in subjects table
	//private Long courseId;
	
	// inserted_by -> user who inserted this subject (Admin/Teacher)
	//@ManyToMany(fetch = FetchType.LAZY)
        //@JoinColumn(name="inserted_by") // FK column in subjects table
	private Long insertedBy;
	
	//@Column(name="status"
	//private STATUS status;
	
	// for soft delete
	@Column(name="deleted_at")
	private LocalDateTime deletedAt;
	
}

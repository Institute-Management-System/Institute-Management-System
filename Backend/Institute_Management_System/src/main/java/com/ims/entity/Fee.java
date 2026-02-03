package com.ims.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name = "fee_id"))

@Entity
@Table(name = "fees")
public class Fee extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "student_id")
	private User student;

	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	@Column
	private Double amount;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private FeeStatus status;
	@Column(name = "payment_date")
	private LocalDate paymentDate;
	@Column(name = "is_inactive")
	private Boolean inactive = false;
}

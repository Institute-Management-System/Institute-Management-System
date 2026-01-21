package com.ims.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@AttributeOverride(name="id",column = @Column(name="user_id") )


@Entity
@Table(name = "users")
public class User extends BaseEntity{

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private ROLE role;
	
	@Column(name = "full_name", nullable=false, length=100)
	private String fullName;
	
	@Column(name="user_name", nullable=false, unique=true, length=100)
	private String username;
	
	@Column(name="password", nullable=false,unique=true, length=255)
	private String password;
	
	@Column(name="email", nullable=false, unique=true, length=100)
	private String email;
	
	@Column(name="phone", length=50)
	private String phone;
	
	@Enumerated(EnumType.STRING)
	@Column(name="gender", length=500)
	private GENDER Gender;
	
	@Column(name="dob")
	private LocalDate dob;
	
	@Column(name="address", length=500)
	private String address;
	
	@Column(name="profile_image", length=500)
	private String profileImage;
	
	@Column(name="admission_date")
	private LocalDate admissionDate;
	
	@Column(name="qualification", length=100)
	private String qualification;
	
	@Column(name="roll_number", length=100)
	private String rollNumber;
	
	@Column(name="designation", length=100)
	private String designation;
	
	@Column(name="last_login")
	private LocalDateTime lastLogin;
	
	@Enumerated(EnumType.STRING)
	@Column(name="Active")
	private STATUS status = STATUS.ACTIVE;
	
	@Column(name="deleted_at")
	private LocalDateTime deletedAt;
}



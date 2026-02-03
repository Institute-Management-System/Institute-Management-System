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

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name = "user_id"))

@Entity
@Table(name = "users")
public class User extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private Role role;

	@Column(name = "full_name", nullable = false, length = 100)
	private String fullName;

	@Column(name = "user_name", nullable = false, unique = true, length = 100)
	private String username;

	@JsonIgnore
	@Column(name = "password", nullable = false, length = 255)
	private String password;

	@Column(name = "email", nullable = false, unique = true, length = 100)
	private String email;

	@Column(name = "phone", nullable = false, unique = true, length = 50)
	private String phone;

	@Enumerated(EnumType.STRING)
	@Column(name = "gender", length = 500)
	private GENDER Gender;

	@Column(name = "dob", nullable = false)
	private LocalDate dob;

	@Column(name = "address", nullable = false, length = 500)
	private String address;

	@Column(name = "profile_image", length = 500)
	private String profileImage;

	@Column(name = "admission_date", nullable = false)
	private LocalDate admissionDate;

	@Column(name = "qualification", nullable = false, length = 100)
	private String qualification;

	@Column(name = "roll_number", nullable = false, length = 100)
	private String rollNumber;

	@Column(name = "designation", nullable = false, length = 100)
	private String designation;

	@Column(name = "last_login")
	private LocalDateTime lastLogin;

	@Column(name = "Active")
	private Boolean status = false;

	@JsonIgnore
	@ToString.Exclude
	@jakarta.persistence.OneToMany(mappedBy = "user")
	private java.util.List<Enrollments> enrollments;

	@JsonIgnore
	@ToString.Exclude
	@jakarta.persistence.OneToMany(mappedBy = "student")
	private java.util.List<Fee> fees;

	@JsonIgnore
	@ToString.Exclude
	@jakarta.persistence.OneToMany(mappedBy = "student")
	private java.util.List<Marks> marks;

	@JsonIgnore
	@ToString.Exclude
	@jakarta.persistence.OneToMany(mappedBy = "user")
	private java.util.List<Attendence> attendances;

	@JsonIgnore
	@ToString.Exclude
	@jakarta.persistence.OneToMany(mappedBy = "user")
	private java.util.List<Feedback> feedbacks;
}

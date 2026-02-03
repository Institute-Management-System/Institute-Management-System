package com.ims.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StudentDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dob;
    private LocalDate joiningDate;
    private String address;
    private String qualification;
    private String gender;
    private String courseName;
    private Long subjectId;
    private Boolean status;
    private String password;
}

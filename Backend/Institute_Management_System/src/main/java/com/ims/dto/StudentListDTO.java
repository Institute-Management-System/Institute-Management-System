package com.ims.dto;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentListDTO {

    private String rollNumber;
    private String fullName;
    private String email;
    private String phone;
    private String gender;
    private String courseName;
    private LocalDate admissionDate;
}

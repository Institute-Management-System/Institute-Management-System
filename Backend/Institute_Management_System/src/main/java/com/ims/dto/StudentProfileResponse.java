package com.ims.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfileResponse {

    private Long id;
    private String rollNumber;
    private String fullName;
    private String qualification; // read-only
    private String email;          // read-only
    private String phone;
    private Boolean status;        // read-only
    private String profileImage;   // filename
}

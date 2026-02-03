package com.ims.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherProfileResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String designation;
    private boolean status;
    private String profileImage;
}

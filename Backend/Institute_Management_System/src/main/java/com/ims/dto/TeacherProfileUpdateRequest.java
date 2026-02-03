package com.ims.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherProfileUpdateRequest {

    private String fullName;
    private String email;
    private String phone;
    private String designation;
    public String password;

}

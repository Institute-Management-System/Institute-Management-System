package com.ims.dto;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
    private String name;
    private String email;
    private String phone;
    private String designation;
    private String password;
}

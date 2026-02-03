package com.ims.dto;

import org.springframework.web.multipart.MultipartFile;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileUpdateRequest {

    // ✅ allowed fields
    private String fullName;
    private String phone;

    // ✅ image upload
    private MultipartFile profileImage;
}

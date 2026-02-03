package com.ims.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubjectTimeTableResponse {
    private Long id;
    private String courseName;
    private String subjectName;
    private String duration;
    private String schedulePath;
}

package com.ims.dto;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EnrolledSubjectResponse {

    private Long enrollmentId;
    private String courseName;
    private LocalDate assignedDate;
    private String subjectName;
    private String schedulePath;
}

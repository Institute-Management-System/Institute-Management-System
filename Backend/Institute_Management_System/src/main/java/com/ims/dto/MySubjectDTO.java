package com.ims.dto;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class MySubjectDTO {

    private Long id; // enrollments_id
    private String courseName;
    private LocalDate startDate; // assigned_date
    private String subjectName;
    private Long courseId;
    private Long subjectId;
    private String schedulePath;
}

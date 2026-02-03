package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluateStudentDTO {

    private String rollNumber;
    private String studentName;
    private Integer marks; // out of 100
    private String status; // PASS/FAIL or "-" etc
}

package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubjectMarksResponse {
    private Long markId;
    private String courseName;
    private String subjectName;
    private int obtainedMarks;
    private int totalMarks;
}

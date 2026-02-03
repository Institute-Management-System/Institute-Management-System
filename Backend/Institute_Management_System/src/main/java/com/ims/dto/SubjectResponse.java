package com.ims.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SubjectResponse {

    private Long subjectId;
    private String subjectName;

    public SubjectResponse(Long subjectId, String subjectName) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }
}

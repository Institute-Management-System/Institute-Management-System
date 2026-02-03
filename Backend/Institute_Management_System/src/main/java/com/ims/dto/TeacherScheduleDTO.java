package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TeacherScheduleDTO {

    private Long id;
    private String courseName;
    private String subjectName;
    private String timetablePath; // ✅ IMPORTANT
}

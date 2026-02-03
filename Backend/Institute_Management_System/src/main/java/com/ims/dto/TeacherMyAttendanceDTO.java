package com.ims.dto;

import java.time.LocalDate;
import com.ims.entity.Status;

public class TeacherMyAttendanceDTO {

    private LocalDate attendanceDate;
    private String courseName;
    private String subjectName;
    private Status status;

    // ✅ JPQL constructor (MANDATORY)
    public TeacherMyAttendanceDTO(
            LocalDate attendanceDate,
            String courseName,
            String subjectName,
            Status status) {

        this.attendanceDate = attendanceDate;
        this.courseName = courseName;
        this.subjectName = subjectName;
        this.status = status;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public Status getStatus() {
        return status;
    }
}
package com.ims.dto;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AttendanceTableResponse {

    private LocalDate attendanceDate;
    private String status;
    private String subjectName;
}

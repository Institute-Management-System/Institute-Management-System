package com.ims.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MonthlyAttendanceRequest {

    private Long courseId;

    // Swagger-friendly, JSON-friendly
    private String month; // "yyyy-MM"
}

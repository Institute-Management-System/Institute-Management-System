package com.ims.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AdminFeeDTO {
    private Long id;
    private Long studentId;
    private String studentName;
    private String courseName;
    private String email;
    private String phone;
    private Double amount;
    private String status; // PAID, PENDING, OVERDUE
    private LocalDate paymentDate;
}

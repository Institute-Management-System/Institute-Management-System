package com.ims.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.ims.entity.FeeStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class FeesResponse {

    private Long feeId;
    private String courseName;
    private BigDecimal amount;
    private FeeStatus status;
    private LocalDate paymentDate;

    public FeesResponse(Long feeId, String courseName, BigDecimal amount, FeeStatus status, LocalDate paymentDate) {
        this.feeId = feeId;
        this.courseName = courseName;
        this.amount = amount;
        this.status = status;
        this.paymentDate = paymentDate;
    }
}

package com.ims.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
public class ApiResponseDTO {

    private LocalDateTime timestamp;
    private Object data;
    private String status;

    public ApiResponseDTO(Object data, String status) {
        this.timestamp = LocalDateTime.now();
        this.data = data;
        this.status = status;
    }
}

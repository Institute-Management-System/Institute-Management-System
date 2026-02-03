package com.ims.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDate publishDate;
}

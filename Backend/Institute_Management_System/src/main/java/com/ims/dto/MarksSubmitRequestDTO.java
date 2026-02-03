package com.ims.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class MarksSubmitRequestDTO {

    private String courseName;
    private String subjectName;

    private List<MarksEntryDTO> marksList;
}

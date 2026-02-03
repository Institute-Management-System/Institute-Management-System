package com.ims.service;

import java.util.List;

import com.ims.dto.CreateExamDTO;
import com.ims.dto.ExamDTO;
import com.ims.dto.ExamResultDTO;

public interface ExamService {
    void createExam(CreateExamDTO examDTO);

    List<ExamDTO> getExamsForTeacher(Long teacherId);

    List<ExamDTO> getExamsForStudent(Long studentId);

    List<ExamResultDTO> getExamResults(Long examId);
}

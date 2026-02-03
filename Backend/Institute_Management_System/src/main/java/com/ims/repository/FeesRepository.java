package com.ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ims.dto.FeesResponse;
import com.ims.entity.Fee;

public interface FeesRepository extends JpaRepository<Fee, Long> {

    @Query("""
                SELECT f
                FROM Fee f
                JOIN FETCH f.course c
                WHERE f.student.id = :userId
            """)
    List<Fee> findFeesDetailsByUserId(@Param("userId") Long userId);
}

package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RunningRecordsRequestDto {
    private LocalDate date;
    private Double time;
    private Double distance;
}
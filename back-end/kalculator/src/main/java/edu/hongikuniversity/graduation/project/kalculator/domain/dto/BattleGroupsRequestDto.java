package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.BattlePurpose;
import edu.hongikuniversity.graduation.project.kalculator.domain.BattleStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BattleGroupsRequestDto {
    private String title;
    private String content;
    private String battlePurpose;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer numberOfMembers;
}
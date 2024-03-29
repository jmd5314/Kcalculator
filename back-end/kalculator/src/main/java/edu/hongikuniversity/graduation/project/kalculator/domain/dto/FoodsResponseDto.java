package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class FoodsResponseDto {
    Integer totalCalories;
    Integer totalCarbohydrates;
    Integer totalProteins;
    Integer totalFats;
    @Builder
    public FoodsResponseDto(int totalCalories,int totalCarbohydrates,int totalProteins,int totalFats){
        this.totalCalories = totalCalories;
        this.totalCarbohydrates = totalCarbohydrates;
        this.totalProteins = totalProteins;
        this.totalFats = totalFats;
    }
}

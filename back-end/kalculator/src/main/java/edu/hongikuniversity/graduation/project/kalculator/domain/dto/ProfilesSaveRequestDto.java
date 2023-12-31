package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.*;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class ProfilesSaveRequestDto {
    private String nickname;
    private Double targetWeight;
    private Integer age;
    private String gender;
    private Double height;
    private Double weight;
    private String activityLevel;
    private String purposeOfUse;
    private Users users;
    @Builder
    public ProfilesSaveRequestDto(String nickname,Double targetWeight,Integer age,String gender,Double height,Double weight
    ,String activityLevel,String purposeOfUse,Users users){
        this.nickname = nickname;
        this.targetWeight = targetWeight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.purposeOfUse = purposeOfUse;
        this.users = users;
    }
    public Profiles toEntity(){
        return Profiles.builder()
                .nickname(nickname)
                .targetWeight(targetWeight)
                .age(age)
                .gender(Gender.valueOf(gender.toUpperCase()))
                .height(height)
                .weight(weight)
                .activityLevel(ActivityLevel.valueOf(activityLevel.toUpperCase()))
                .purposeOfUse(PurposeOfUse.valueOf(purposeOfUse.toUpperCase()))
                .build();
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsersJoinRequestDto {
    private String userId;
    private String name;
    private String password;
    private String email;

}

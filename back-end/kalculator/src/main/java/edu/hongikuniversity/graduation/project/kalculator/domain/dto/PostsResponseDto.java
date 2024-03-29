package edu.hongikuniversity.graduation.project.kalculator.domain.dto;

import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import lombok.Getter;

import java.time.LocalDate;
@Getter
public class PostsResponseDto {
    private Long postId;
    private String userId;
    private String title;
    private String content;
    private LocalDate creationDate;
    public PostsResponseDto(Posts entity){
        this.postId = entity.getPostId();
        this.userId = entity.getUsers().getUserId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.creationDate = entity.getCreationDate();
    }
}

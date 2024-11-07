package edu.hongikuniversity.graduation.project.kalculator.domain.post.controller;

import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostCreateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.request.PostUpdateRequest;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostBriefResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostDetailsResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostIdResponse;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.controller.dto.response.PostsResponseDto;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.service.PostService;
import edu.hongikuniversity.graduation.project.kalculator.global.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<ApiResponse<PostIdResponse>> create(@RequestBody @Valid PostCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(postService.create(request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PostDetailsResponse>> confirm(@RequestParam Long id) {
        return ResponseEntity.ok().body(ApiResponse.success(postService.findById(id)));
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<PostBriefResponse>>> confirmList() {
        return ResponseEntity.ok().body(ApiResponse.success(postService.findAll()));

    }

    @PutMapping
    public ResponseEntity<ApiResponse<PostIdResponse>> update(@RequestBody PostUpdateRequest request) {
        return ResponseEntity.ok().body(ApiResponse.success(postService.update(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
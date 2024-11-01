package edu.hongikuniversity.graduation.project.kalculator.service;

import edu.hongikuniversity.graduation.project.kalculator.domain.Comments;
import edu.hongikuniversity.graduation.project.kalculator.domain.Hearts;
import edu.hongikuniversity.graduation.project.kalculator.domain.Posts;
import edu.hongikuniversity.graduation.project.kalculator.domain.dto.PostsRequestDto;
import edu.hongikuniversity.graduation.project.kalculator.repository.CommentsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.HeartsRepository;
import edu.hongikuniversity.graduation.project.kalculator.repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostsService {
    private final PostsRepository postsRepository;
    private final HeartsRepository heartsRepository;
    private final CommentsRepository commentsRepository;
    @Transactional
    public Long save(Posts posts){
        return postsRepository.save(posts).getPostId();
    }
    public Posts findById(Long id){
        return postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
    }

    public List<Posts> findAll() {
        return postsRepository.findAll();
    }
    @Transactional
    public void deletePosts(Long postId) {
        Posts posts = postsRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        List<Hearts> heartsList = heartsRepository.findByPosts(posts);
        // 해당 게시물의 모든 좋아요 제거
        for(Hearts hearts:heartsList){
            heartsRepository.delete(hearts);
        }
        List<Comments> commentsList = commentsRepository.findByPosts(posts);
        // 해당 게시물의 모든 댓글 제거
        for(Comments comments:commentsList){
            commentsRepository.delete(comments);
        }
        postsRepository.delete(posts);
    }
    @Transactional
    public Posts updatePosts(Long postId, PostsRequestDto requestDto) {
        Posts posts = postsRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시물을 찾을 수 없습니다."));
        posts.update(requestDto.getTitle(), requestDto.getContent());
        return postsRepository.save(posts);
    }
}

package edu.hongikuniversity.graduation.project.kalculator.domain.comment.repository;

import edu.hongikuniversity.graduation.project.kalculator.domain.comment.entity.Comment;
import edu.hongikuniversity.graduation.project.kalculator.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPost(Post post);
}

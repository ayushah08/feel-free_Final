package com.feelfree.backend.repository.FeelFree;

import com.feelfree.backend.entity.FeelWall.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostCommentRepository
        extends JpaRepository<PostComment, Long> {

    List<PostComment> findByPostId(Long postId);

    long countByUserId(Long userId);
}
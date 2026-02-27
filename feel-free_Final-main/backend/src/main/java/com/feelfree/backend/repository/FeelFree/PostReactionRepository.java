package com.feelfree.backend.repository.FeelFree;

import com.feelfree.backend.entity.FeelWall.PostReaction;
import com.feelfree.backend.entity.FeelWall.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostReactionRepository extends JpaRepository<PostReaction
        , Long> {
    List<PostReaction> findByPostId(Long postId);

    long countByPostIdAndReactionType(Long postId , ReactionType reactionType);

    boolean existsByPostIdAndUserId(Long postId , Long userId);
}

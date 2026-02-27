package com.feelfree.backend.repository.FeelFree;

import com.feelfree.backend.entity.FeelWall.PostReaction;
import com.feelfree.backend.entity.FeelWall.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostReactionRepository extends JpaRepository<PostReaction
        , Long> {
    List<PostReaction> findByPostId(Long postId);

    long countByPostIdAndReactionType(Long postId , ReactionType reactionType);

    boolean existsByPostIdAndUserId(Long postId , Long userId);

    long countByUserId(Long userId);

    @Query("SELECT COUNT(r) FROM PostReaction r WHERE r.post.user.id = :userId")
    long countReactionsReceived(@Param("userId") Long userId);}

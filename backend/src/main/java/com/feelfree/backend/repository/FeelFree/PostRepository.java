package com.feelfree.backend.repository.FeelFree;

import com.feelfree.backend.entity.FeelWall.Post;
import com.feelfree.backend.entity.FeelWall.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    long countByUserId(Long userId);
}
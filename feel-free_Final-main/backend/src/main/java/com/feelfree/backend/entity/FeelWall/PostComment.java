package com.feelfree.backend.entity.FeelWall;

import com.feelfree.backend.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private boolean anonymous;

    private LocalDateTime createdAt;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;
}
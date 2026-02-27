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
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(length = 1000 , nullable = false)
    private String content ;

    private boolean anonymous;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;
}

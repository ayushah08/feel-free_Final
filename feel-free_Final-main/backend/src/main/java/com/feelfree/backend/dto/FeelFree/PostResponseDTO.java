package com.feelfree.backend.dto.FeelFree;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostResponseDTO {

    private Long id;
    private String content;
    private String author;
    private boolean anonymous;
    private  Long relateCount;
    private Long calmCount;
    private Long notAloneCount;
    private LocalDateTime createdAt;
}
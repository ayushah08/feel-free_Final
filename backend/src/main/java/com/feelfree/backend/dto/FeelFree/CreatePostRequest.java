package com.feelfree.backend.dto.FeelFree;


import lombok.Data;

@Data
public class CreatePostRequest {

    private String content;
    private boolean anonymous;
}


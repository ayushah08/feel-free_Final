package com.feelfree.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDTO {

    private Long id;
    private String userName;
    //No password due to data safety
    private String email;
    private String profilePhotoUrl;
    private int currentStreak;
    private int longestStreak;
    private int totalSupportGiven;
    private int totalSupportTaken;
}

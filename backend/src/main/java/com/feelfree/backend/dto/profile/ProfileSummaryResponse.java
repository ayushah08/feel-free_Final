package com.feelfree.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ProfileSummaryResponse {

    private int longestStreak;
    private int currentStreak;
    private int totalAchievements;
    private double overallProgressPercentage;
}

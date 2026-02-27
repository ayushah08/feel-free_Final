package com.feelfree.backend.dto.Achivement;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AchievementSummaryDTO {

    private long totalAchievements;
    private long unlockedAchievements;
    private double overallProgressPercentage;
}

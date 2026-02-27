package com.feelfree.backend.dto.Achivement;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AchievementResponseDTO {

    private String title;
    private String description;
    private String rarity;
    private int targetValue;
    private int progressValue;
    private boolean unlocked;
    private LocalDate unlockedDate;
}


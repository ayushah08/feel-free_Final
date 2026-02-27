package com.feelfree.backend.dto.Achivement;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AchievementDTO {

    private String title;
    private String description;
    private boolean unlocked;
}
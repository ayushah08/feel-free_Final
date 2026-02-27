package com.feelfree.backend.Initializers;

import com.feelfree.backend.entity.Achivement.Achievement;
import com.feelfree.backend.entity.Achivement.AchievementType;
import com.feelfree.backend.repository.Achivement.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AchievementInitializer {

    private final AchievementRepository achievementRepository;

    public void init(){
        for(AchievementType type : AchievementType.values()){

            if (achievementRepository.findByType(type).isEmpty()) {

                Achievement achievement = Achievement.builder().title(type.name()).description("Unlock by completing related activity").type(type).targetValue(getTargetValue(type)).build();

                achievementRepository.save(achievement);
            }
            }
        }

        private int getTargetValue(AchievementType type){
        return switch (type){
            case FIRST_MOOD , FIRST_POST->1;
            case STREAK_7 -> 7;
            case STREAK_30 -> 30;
            case ZEN_MASTER -> 1000;
            case MEDITATION_10_HOURS -> 600;
            case BREATHING_50 -> 50;
            case FEEL_WALL_100 -> 100;

        };

    }
}

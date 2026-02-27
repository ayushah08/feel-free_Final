package com.feelfree.backend.service.achivement;

import com.feelfree.backend.dto.Achivement.AchievementResponseDTO;
import com.feelfree.backend.dto.Achivement.AchievementSummaryDTO;
import com.feelfree.backend.dto.profile.ProfileSummaryResponse;
import com.feelfree.backend.entity.Achivement.Achievement;
import com.feelfree.backend.entity.Achivement.UserAchievement;
import com.feelfree.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AchievementService {
    void checkAndUnlockAchievements(User user);

    UserAchievement createUserAchievement(User user, Achievement achievement);

    AchievementSummaryDTO getSummary(Long userId);

    List<AchievementResponseDTO> getUserAchievements(Long userId);

    int calculateProgress(User user, Achievement achievement);

    void unlock(User user, Achievement achievement);

    ProfileSummaryResponse getProfileSummary(Long userId);

}

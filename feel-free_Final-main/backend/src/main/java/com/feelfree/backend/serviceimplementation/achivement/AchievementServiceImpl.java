package com.feelfree.backend.serviceimplementation.achivement;

import com.feelfree.backend.dto.Achivement.AchievementResponseDTO;
import com.feelfree.backend.dto.Achivement.AchievementSummaryDTO;
import com.feelfree.backend.dto.profile.ProfileSummaryResponse;
import com.feelfree.backend.entity.Achivement.Achievement;
import com.feelfree.backend.entity.Achivement.UserAchievement;
import com.feelfree.backend.entity.User;
import com.feelfree.backend.repository.Achivement.AchievementRepository;
import com.feelfree.backend.repository.Achivement.UserAchivementRepository;
import com.feelfree.backend.repository.Mood.MoodRepository;
import com.feelfree.backend.repository.UserRepository;
import com.feelfree.backend.service.achivement.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AchievementServiceImpl implements AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserAchivementRepository userAchievementRepository;
    private final MoodRepository moodRepository;
    private final UserRepository userRepository;

    @Override
    public void checkAndUnlockAchievements(User user) {

        List<Achievement> achievements = achievementRepository.findAll();

        for (Achievement achievement : achievements) {

            UserAchievement userAchievement =
                    (UserAchievement) userAchievementRepository
                            .findByUserIdAndAchievementId(user.getId(), achievement.getId())
                            .orElseGet(() -> createUserAchievement(user, achievement));

            if (userAchievement.isUnlocked()) continue;

            int progress = calculateProgress(user, achievement);

            userAchievement.setProgressValue(progress);

            if (progress >= achievement.getTargetValue()) {
                userAchievement.setUnlocked(true);
                userAchievement.setUnlockedDate(LocalDate.now());
            }

            userAchievementRepository.save(userAchievement);
        }
    }

     public int calculateProgress(User user, Achievement achievement) {

        return switch (achievement.getType()) {

            case FIRST_MOOD -> (int) moodRepository.countByUser(user);

            case STREAK_7 -> user.getCurrentStreak();


            default -> 0;
        };
    }


    public UserAchievement createUserAchievement(User user, Achievement achievement) {

        return UserAchievement.builder()
                .user(user)
                .achievement(achievement)
                .progressValue(0)
                .unlocked(false)
                .build();
    }


    public void unlock(User user, Achievement achievement) {

        userAchievementRepository.save(
                UserAchievement.builder()
                        .user(user)
                        .achievement(achievement)
                        .unlocked(true)
                        .unlockedDate(LocalDate.now())
                        .build()
        );
    }

    @Override
    public AchievementSummaryDTO getSummary(Long userId) {

        User user = userRepository.findById(userId).orElseThrow();

        long total = achievementRepository.count();

        long unlocked =
                userAchievementRepository.findByUser(user)
                        .stream()
                        .filter(UserAchievement::isUnlocked)
                        .count();

        double percentage =
                total == 0 ? 0 : ((double) unlocked / total) * 100;

        return AchievementSummaryDTO.builder()
                .totalAchievements(total)
                .unlockedAchievements(unlocked)
                .overallProgressPercentage(percentage)
                .build();
    }

    @Override
    public List<AchievementResponseDTO> getUserAchievements(Long userId) {

        User user = userRepository.findById(userId).orElseThrow();

        return userAchievementRepository.findByUser(user)
                .stream()
                .map(ua -> AchievementResponseDTO.builder()
                        .title(ua.getAchievement().getTitle())
                        .description(ua.getAchievement().getDescription())
                        .rarity(ua.getAchievement().getRarity())
                        .unlocked(ua.isUnlocked())
                        .unlockedDate(ua.getUnlockedDate())
                        .build())
                .toList();
    }

    public ProfileSummaryResponse getProfileSummary(Long userId){

        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException(" User Not Found"));

       List< UserAchievement >  userAchievement = userAchievementRepository.findByUser(user);


       int totalAchievements = achievementRepository.findAll().size();

       int unlockedAchievements;
        unlockedAchievements = (int) userAchievement.stream().filter(UserAchievement::isUnlocked).count();

        double progress = totalAchievements == 0 ? 0 : ((double) unlockedAchievements / totalAchievements *100);

        return
                ProfileSummaryResponse.builder().longestStreak(user.getLongestStreak()).currentStreak(user.getCurrentStreak()).totalAchievements(totalAchievements).overallProgressPercentage(progress).build();

    }
}

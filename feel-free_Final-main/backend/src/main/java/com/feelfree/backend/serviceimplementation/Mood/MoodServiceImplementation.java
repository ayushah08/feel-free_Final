package com.feelfree.backend.serviceimplementation.Mood;

import com.feelfree.backend.entity.Mood.Mood;
import com.feelfree.backend.entity.Mood.MoodType;
import com.feelfree.backend.entity.User;
import com.feelfree.backend.repository.Mood.MoodRepository;
import com.feelfree.backend.repository.UserRepository;
import com.feelfree.backend.service.Ai.AiService;
import com.feelfree.backend.service.Mood.MoodService;
import com.feelfree.backend.service.achivement.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MoodServiceImplementation implements MoodService {

    private final AiService aiService;
    private final MoodRepository moodRepository;
    private final UserRepository userRepository;
    private final AchievementService achievementService;


    @Override
    public Mood logMood(Long userId, MoodType moodType) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found with ID : " + userId));

        String supportiveMessage =
                aiService.generateSupportMessage(moodType);

        Mood mood = Mood.builder()
                .moodType(moodType)
                .supportiveMessage(supportiveMessage)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        Mood save = moodRepository.save(mood);
        updateStreak(user);
        achievementService.checkAndUnlockAchievements(user);

        return save;
    }
        public void updateStreak(User user){
            LocalDate today = LocalDate.now();
            LocalDate lastActivity = user.getLastActivityDate();

            if (lastActivity == null){
                user.setCurrentStreak(1);
            } else if (lastActivity.equals(today.minusDays(1))) {
                user.setCurrentStreak(user.getCurrentStreak()+1);

            }else if (!lastActivity.equals(today)){
                user.setCurrentStreak(1);
            }

            if (user.getCurrentStreak() > user.getLongestStreak()){
                user.setLongestStreak(user.getCurrentStreak());
            }
            user.setLastActivityDate(today);
            userRepository.save(user);
        }

    @Override
    public List<Mood> getUserMoodByUserName(String userName) {
User user = userRepository.findByUserName(userName).orElseThrow(()-> new RuntimeException("User Not Found"));

    return moodRepository.findByUser(user) ;
    }

    @Override
    public Mood logMoodByUsername(String userName, MoodType moodType) {
User user = userRepository.findByUserName(userName).orElseThrow(()->new RuntimeException("User not found"));

   String supportiveMessage = aiService.generateSupportMessage(moodType);

    Mood mood = Mood.builder().moodType(moodType).supportiveMessage(supportiveMessage).createdAt(LocalDateTime.now()).user(user).build();

    Mood saved = moodRepository.save(mood);

    achievementService.checkAndUnlockAchievements(user);

    return saved;
    }

    @Override
    public List<Mood> getUserMoods(Long userId) {

        return moodRepository.findUserById(userId);
    }
}
